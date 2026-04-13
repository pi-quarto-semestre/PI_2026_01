[Página inicial](../README.md) | [Como contribuir: Backend](README.md) | [Como contribuir: Frontend](../frontend/README.md)

# Instruções para o Backend

## Pré-requisitos

- [Java 21+](https://adoptium.net/)
- [PostgreSQL](https://www.postgresql.org/download/) instalado localmente
- Maven (já incluso no projeto via `mvnw`)
- IDE de sua preferência (Eclipse, IntelliJ, VS Code)

---

## Como rodar (banco local)

### 1. Clone o repositório

```bash
git clone https://github.com/pi-quarto-semestre/PI_2026_01.git
```

### 2. Crie o banco de dados local

Abra o terminal do PostgreSQL (`psql`) e execute:

```sql
CREATE DATABASE "DeereMail";
```

### 3. Configure o `settings.ini`

Na pasta `backend/`, copie o arquivo de exemplo:

```bash
cp settings.exemplo.ini settings.ini
```

Edite o `settings.ini` com os dados do seu PostgreSQL local:

```ini
sql.url=jdbc:postgresql://localhost:5432/DeereMail
sql.user=postgres
sql.password=sua_senha_do_postgres
```

### 4. Execute o projeto

Pelo terminal dentro da pasta `backend`:

```bash
./mvnw spring-boot:run
```

Na **primeira execução**, o Flyway criará automaticamente todas as tabelas no banco. Nenhum script SQL precisa ser rodado manualmente.

O backend estará disponível em `http://localhost:8080`.
---

## Usando o banco na nuvem (Supabase)

Se preferir usar o PostgreSQL na nuvem em vez de local:

### 1. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **New project** e preencha:
   - **Name:** qualquer nome (ex: `hermes`)
   - **Database password:** crie uma senha forte e **guarde-a**
   - **Region:** South America (São Paulo)
3. Aguarde o projeto ser criado

### 2. Configure o `settings.ini`

Na pasta `backend/`, copie o arquivo de exemplo para nuvem:

```bash
cp settings.cloud.exemplo.ini settings.ini
```

Preencha com os valores do seu projeto Supabase:

| Campo | Onde encontrar no Supabase |
|---|---|
| `sql.url` | Settings → Database → Connection string → JDBC |
| `sql.user` | `postgres` |
| `sql.password` | Senha definida na criação do projeto |
| `supabase.projectUrl` | Settings → API → Project URL |
| `supabase.serviceRoleKey` | Settings → API → API Keys → service_role |
| `storage.bucketName` | `templates` |

### 3. Execute com o perfil cloud

```bash
./mvnw spring-boot:run "-Dspring.profiles.active=cloud"
```

As tabelas serão criadas automaticamente no Supabase pelo Flyway.

---

## Banco de dados

As tabelas são criadas e versionadas automaticamente pelo **Flyway** a partir dos arquivos em:

```
src/main/resources/db/migration/
├── V1__create_users.sql
├── V2__create_api_keys.sql
├── V3__create_templates.sql
├── V4__create_template_versions.sql
├── V5__create_email_sends.sql
├── V6__add_categories_and_tags.sql
└── V7__add_updated_at.sql
```

O Flyway funciona da mesma forma tanto no banco local quanto no Supabase.

### Adicionando novas tabelas ou alterações no schema

**Nunca altere um arquivo de migration existente.** Crie sempre um novo arquivo com o próximo número:

```
V8__add_coluna_xyz.sql
V9__create_tabela_abc.sql
```

O Flyway detecta automaticamente os arquivos novos e aplica apenas o que ainda não foi executado no banco.
