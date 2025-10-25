'''
Business: Прокси для выполнения заказов через внешние API сервисов накрутки
Args: event - dict с httpMethod, body (JSON с service_type, channel_url, quantity)
Returns: HTTP response с результатом создания заказа
'''

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        service_type = body_data.get('service_type')
        channel_url = body_data.get('channel_url')
        quantity = body_data.get('quantity')
        customer_email = body_data.get('customer_email')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT price_per_unit FROM service_settings WHERE service_type = %s AND is_active = true",
                (service_type,)
            )
            service = cur.fetchone()
            
            if not service:
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Service not found'}),
                    'isBase64Encoded': False
                }
            
            total_price = float(service['price_per_unit']) * quantity
            
            cur.execute(
                "SELECT * FROM api_integrations WHERE service_type = %s AND is_active = true LIMIT 1",
                (service_type,)
            )
            integration = cur.fetchone()
            
            external_order_id = None
            api_integration_id = None
            status = 'pending'
            
            if integration:
                api_integration_id = integration['id']
                
                try:
                    api_payload = {
                        'service': service_type,
                        'link': channel_url,
                        'quantity': quantity
                    }
                    
                    req = urllib.request.Request(
                        integration['api_url'],
                        data=json.dumps(api_payload).encode('utf-8'),
                        headers={
                            'Content-Type': 'application/json',
                            'Authorization': f"Bearer {integration['api_key']}"
                        },
                        method='POST'
                    )
                    
                    with urllib.request.urlopen(req, timeout=10) as response:
                        api_response = json.loads(response.read().decode('utf-8'))
                        external_order_id = api_response.get('order_id') or api_response.get('order')
                        status = 'processing'
                
                except Exception as e:
                    status = 'failed'
            
            cur.execute(
                """INSERT INTO orders 
                   (service_type, channel_url, quantity, price, status, api_integration_id, external_order_id, customer_email) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s) 
                   RETURNING id, status, external_order_id""",
                (service_type, channel_url, quantity, total_price, status, api_integration_id, external_order_id, customer_email)
            )
            order = cur.fetchone()
            conn.commit()
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'order_id': order['id'],
                'status': order['status'],
                'external_order_id': order['external_order_id'],
                'total_price': total_price
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        order_id = event.get('queryStringParameters', {}).get('order_id')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if order_id:
                cur.execute(
                    "SELECT * FROM orders WHERE id = %s",
                    (order_id,)
                )
                order = cur.fetchone()
                conn.close()
                
                if not order:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Order not found'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'id': order['id'],
                        'service_type': order['service_type'],
                        'channel_url': order['channel_url'],
                        'quantity': order['quantity'],
                        'price': float(order['price']),
                        'status': order['status'],
                        'created_at': order['created_at'].isoformat() if order['created_at'] else None
                    }),
                    'isBase64Encoded': False
                }
            else:
                cur.execute(
                    "SELECT * FROM orders ORDER BY created_at DESC LIMIT 50"
                )
                orders = cur.fetchall()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([{
                        'id': o['id'],
                        'service_type': o['service_type'],
                        'quantity': o['quantity'],
                        'price': float(o['price']),
                        'status': o['status'],
                        'created_at': o['created_at'].isoformat() if o['created_at'] else None
                    } for o in orders]),
                    'isBase64Encoded': False
                }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
