CREATE TABLE IF NOT EXISTS api_keys (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_value   VARCHAR(512) UNIQUE NOT NULL,
    description VARCHAR(255),
    owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    active      BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW()
);
