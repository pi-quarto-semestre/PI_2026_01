-- Adiciona updated_at nas tabelas que podem ser editadas

ALTER TABLE users
    ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

ALTER TABLE templates
    ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

ALTER TABLE template_versions
    ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

ALTER TABLE email_sends
    ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
