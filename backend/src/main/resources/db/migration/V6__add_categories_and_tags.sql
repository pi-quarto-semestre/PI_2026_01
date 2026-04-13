-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) UNIQUE NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Categorias padrão do sistema
INSERT INTO categories (name) VALUES
    ('Marketing Agrícola'),
    ('Produtos e Lançamentos'),
    ('Comunicados Internos'),
    ('Canal de Vendas'),
    ('Eventos'),
    ('Pós-venda');

-- Adiciona categoria ao template
ALTER TABLE templates
    ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Tabela de tags
CREATE TABLE IF NOT EXISTS tags (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) UNIQUE NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Relacionamento N:N entre templates e tags
CREATE TABLE IF NOT EXISTS template_tags (
    template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
    tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (template_id, tag_id)
);
