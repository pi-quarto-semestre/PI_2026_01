CREATE TABLE IF NOT EXISTS template_versions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
    version     VARCHAR(50) NOT NULL,
    content     TEXT NOT NULL,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE (template_id, version)
);
