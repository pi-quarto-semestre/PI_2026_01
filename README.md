[Página inicial](README.md) | [Como contribuir: Backend](backend/README.md) | [Como contribuir: Frontend](frontend/README.md)

# Hermes — Sistema Central de Notificações

Projeto integrador do 1º semestre de 2026 (4º semestre) — Fatec Indaiatuba em parceria com a **John Deere**.

O Hermes é uma plataforma centralizada para envio e agendamento de comunicações por e-mail, permitindo que diferentes times utilizem um único serviço com suporte a templates, versionamento e agendamento.

---

## Estrutura do projeto

```
PI_2026_01/
├── backend/    → API REST em Java com Spring Boot
└── frontend/   → Interface web em React + Vite
```

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/pi-quarto-semestre/PI_2026_01.git
```

### 2. Siga as instruções específicas de cada parte

- [Backend (Java / Spring Boot)](backend/README.md)
- [Frontend (React / Vite)](frontend/README.md)

---

## Banco de dados

Por padrão, o projeto usa **PostgreSQL local**. As tabelas são criadas automaticamente pelo Flyway na primeira execução do backend.

Opcionalmente, é possível usar o banco na nuvem via Supabase. Veja as [instruções do backend](backend/README.md) para mais detalhes.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite + React Router + Axios |
| Backend | Java 21 + Spring Boot 4 + JPA |
| Banco | PostgreSQL (local ou Supabase) |
| Migrations | Flyway |
