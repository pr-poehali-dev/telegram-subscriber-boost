-- API интеграции для автоматического выполнения заказов
CREATE TABLE api_integrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    api_url VARCHAR(500) NOT NULL,
    api_key VARCHAR(500) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Заказы клиентов
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    service_type VARCHAR(100) NOT NULL,
    channel_url VARCHAR(500) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    api_integration_id INTEGER REFERENCES api_integrations(id),
    external_order_id VARCHAR(255),
    customer_email VARCHAR(255),
    customer_telegram VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Настройки услуг
CREATE TABLE service_settings (
    id SERIAL PRIMARY KEY,
    service_type VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    icon VARCHAR(50),
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных для услуг
INSERT INTO service_settings (service_type, title, description, price_per_unit, icon, features) VALUES
('subscribers', 'Подписчики', 'Живые активные подписчики для вашего канала', 0.30, 'Users', '["Реальные аккаунты", "Постепенная накрутка", "Гарантия качества"]'::jsonb),
('reactions', 'Реакции', 'Эмоциональный отклик на ваши посты', 0.10, 'Heart', '["Все виды реакций", "Быстрая доставка", "Органичный вид"]'::jsonb),
('votes', 'Голоса', 'Голоса в опросах для нужного результата', 0.15, 'CheckSquare', '["Любой вариант", "Безопасно", "Моментальный старт"]'::jsonb),
('views', 'Просмотры', 'Увеличение охвата публикаций', 0.05, 'Eye', '["До 1М просмотров", "Статистика в реальном времени", "Без блокировок"]'::jsonb),
('premium', 'Telegram Premium', 'Премиум-подписчики для статуса', 0.50, 'Crown', '["Премиум аккаунты", "Высокая активность", "Эксклюзив"]'::jsonb),
('bots', 'Старты Ботов', 'Запуски вашего бота реальными пользователями', 0.20, 'Bot', '["Живые пользователи", "Разные команды", "Аналитика"]'::jsonb);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_api_integrations_active ON api_integrations(is_active);
