CREATE TABLE IF NOT EXISTS email_sends (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_version_id UUID REFERENCES template_versions(id) ON DELETE SET NULL,
    variables           JSONB,
    recipients          TEXT[] NOT NULL,
    cc                  TEXT[],
    bcc                 TEXT[],
    subject             VARCHAR(512) NOT NULL,
    status              VARCHAR(50) DEFAULT 'PENDING'
                            CHECK (status IN ('PENDING', 'SENT', 'FAILED', 'SCHEDULED', 'CANCELLED')),
    scheduled_at        TIMESTAMP,
    sent_at             TIMESTAMP,
    error_message       TEXT,
    requested_by        UUID REFERENCES users(id) ON DELETE SET NULL,
    api_key_id          UUID REFERENCES api_keys(id) ON DELETE SET NULL,
    created_at          TIMESTAMP DEFAULT NOW()
);
