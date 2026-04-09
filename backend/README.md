[Página inicial](../README.md) | [Como contribuir: Backend](README.md) | [Como contribuir: Frontend](../frontend/README.md)

# Instruções para o Backend

## Pré-requisitos

- [Java 21+](https://adoptium.net/)
- Maven (já incluso no projeto via `mvnw`)
- Conta gratuita no [Supabase](https://supabase.com)
- IDE de sua preferência (Eclipse, IntelliJ, VS Code)

> **Não é necessário instalar PostgreSQL localmente.** O banco de dados roda no Supabase (nuvem).

---

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/pi-quarto-semestre/PI_2026_01.git
```

### 2. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **New project** e preencha:
   - **Name:** qualquer nome (ex: `hermes`)
   - **Database password:** crie uma senha forte e **guarde-a**
   - **Region:** South America (São Paulo)
3. Aguarde o projeto ser criado (cerca de 1 minuto)

### 3. Configure o `settings.ini`

Na pasta `backend/`, copie o arquivo de exemplo:

```bash
cp settings.exemplo.ini settings.ini
```

Agora preencha o `settings.ini` com os valores do seu projeto Supabase:

---

**`supabase.projectUrl`**

No dashboard do Supabase: **Settings → API → Project URL**

```
supabase.projectUrl=https://xxxxxxxxxxxx.supabase.co
```

---

**`supabase.serviceRoleKey`**

No dashboard do Supabase: **Settings → API → API Keys → service_role → Copy**

```
supabase.serviceRoleKey=eyJhbGci...
```

---

**`sql.url`**

No dashboard do Supabase: **Settings → Database → Connection string → JDBC**

Substitua `[YOUR-PASSWORD]` pela senha que você definiu na criação do projeto.

```
sql.url=jdbc:postgresql://db.xxxxxxxxxxxx.supabase.co:5432/postgres?sslmode=require
```

---

**`sql.user`**

```
sql.user=postgres
```

---

**`sql.password`**

A senha que você definiu na criação do projeto Supabase.

```
sql.password=sua_senha_aqui
```

---

**`storage.bucketName`**

```
storage.bucketName=templates
```

---

> Os valores de `hash.*` já estão preenchidos no `settings.exemplo.ini` e não precisam ser alterados.

### 4. Abra o projeto na sua IDE

No Eclipse: `File > Open Projects from File System... > Directory` e selecione a pasta `backend`.

### 5. Execute o projeto

Pelo terminal dentro da pasta `backend`:

```bash
./mvnw spring-boot:run
```

Na **primeira execução**, o Flyway criará automaticamente todas as tabelas no seu banco do Supabase. Nenhum script SQL precisa ser rodado manualmente.

O backend estará disponível em `http://localhost:8080`.

---

## Banco de dados

As tabelas são criadas e versionadas automaticamente pelo **Flyway** a partir dos arquivos em:

```
src/main/resources/db/migration/
├── V1__create_users.sql
├── V2__create_api_keys.sql
├── V3__create_templates.sql
├── V4__create_template_versions.sql
└── V5__create_email_sends.sql
```

### Adicionando novas tabelas ou alterações no schema

**Nunca altere um arquivo de migration existente.** Crie sempre um novo arquivo com o próximo número:

```
V6__add_coluna_xyz.sql
V7__create_tabela_abc.sql
```

O Flyway detecta automaticamente os arquivos novos e aplica apenas o que ainda não foi executado no banco.
