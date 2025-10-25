'''
Business: Управление API интеграциями с внешними сервисами
Args: event - dict с httpMethod, body (JSON с name, api_url, api_key, service_type)
Returns: HTTP response со списком или результатом создания интеграции
'''

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    if method == 'GET':
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM api_integrations ORDER BY created_at DESC")
            integrations = cur.fetchall()
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps([{
                'id': i['id'],
                'name': i['name'],
                'api_url': i['api_url'],
                'api_key': '***' + i['api_key'][-4:] if len(i['api_key']) > 4 else '***',
                'service_type': i['service_type'],
                'is_active': i['is_active'],
                'created_at': i['created_at'].isoformat() if i['created_at'] else None
            } for i in integrations]),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name')
        api_url = body_data.get('api_url')
        api_key = body_data.get('api_key')
        service_type = body_data.get('service_type')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """INSERT INTO api_integrations (name, api_url, api_key, service_type) 
                   VALUES (%s, %s, %s, %s) RETURNING id, name, service_type, is_active""",
                (name, api_url, api_key, service_type)
            )
            integration = cur.fetchone()
            conn.commit()
        
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'id': integration['id'],
                'name': integration['name'],
                'service_type': integration['service_type'],
                'is_active': integration['is_active']
            }),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        integration_id = body_data.get('id')
        is_active = body_data.get('is_active')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "UPDATE api_integrations SET is_active = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING id, is_active",
                (is_active, integration_id)
            )
            integration = cur.fetchone()
            conn.commit()
        
        conn.close()
        
        if not integration:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Integration not found'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'id': integration['id'],
                'is_active': integration['is_active']
            }),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        body_data = json.loads(event.get('body', '{}'))
        integration_id = body_data.get('id')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("DELETE FROM api_integrations WHERE id = %s RETURNING id", (integration_id,))
            deleted = cur.fetchone()
            conn.commit()
        
        conn.close()
        
        if not deleted:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Integration not found'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
