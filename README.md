# M📧nsag📧iro

Plataforma de gerenciamento e envio de emails com templates personalizáveis.


---

## Índice

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar](#como-executar)
- [Stack Tecnológica](#stack-tecnológica)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Troubleshooting](#troubleshooting)

---

## Visão Geral

Mensageiro é uma aplicação full-stack que permite:
- Autenticação de usuários com JWT
- Criar e gerenciar templates de email
- Enviar emails em massa com variáveis personalizadas
- Interface web simples e intuitiva

---

## Pré-requisitos

- Docker e Docker Compose instalados ([guia de instalação](https://docs.docker.com/get-docker/))

---

## Como Executar

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/mensageiro.git
cd mensageiro
```

### Configure as variáveis de ambiente

**Copie os arquivos de exemplo:**

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

**Edite `backend/.env` com as seguintes configurações:**

```env
DATABASE_URL="postgresql://admin:admin8544@postgres:5432/mensageiro?schema=public"
CORS_ORIGIN="http://localhost:8080"
JWT_SECRET="sua_chave_secreta_bem_forte_aqui"
NODE_ENV="development"
```

> **Segurança:** Em produção, mude a senha do banco e o JWT_SECRET para valores únicos e fortes.

### Suba a aplicação com Docker

```bash
docker compose up --build
```

Este comando irá:
- Construir as imagens do backend e frontend
- Iniciar o PostgreSQL
- Iniciar o backend na porta 3000
- Iniciar o frontend na porta 8080

**Aguarde até ver as mensagens de sucesso:**
```
✓ Backend rodando em http://localhost:3000
✓ Banco de dados conectado
✓ Frontend servindo em http://localhost:8080
```

### Execute as migrations do banco de dados

**Em outro terminal:**

```bash
docker exec -it mensageiro_backend npx prisma migrate dev --name init
```

> Isso criará as tabelas necessárias no PostgreSQL.

### Acesse a aplicação

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:8080/pages/login.html |
| Backend API | http://localhost:3000 |
| Banco de dados | localhost:5432 (user: admin, pass: admin8544) |

---

## Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Type safety
- **Express** - Web framework
- **Prisma** - ORM para banco de dados
- **JWT** - Autenticação

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização
- **JavaScript (Vanilla)** - Interatividade

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **PostgreSQL** - Banco de dados
- **Nginx** - Reverse proxy

---

## Documentação da API

**Base URL:** `http://localhost:3000/api`

### Rotas Públicas (sem autenticação)

#### Registrar Usuário

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Eduardo",
  "email": "edu@gmail.com",
  "password": "12345678"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-123",
  "name": "Eduardo",
  "email": "edu@gmail.com",
  "createdAt": "2024-02-25T10:30:00Z"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "edu@gmail.com",
  "password": "12345678"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-123",
    "name": "Eduardo",
    "email": "edu@gmail.com"
  }
}
```

---

### Rotas Autenticadas

**Todas as rotas abaixo exigem header:**
```http
Authorization: Bearer <seu_token_jwt>
```

#### Listar Usuários

```http
GET /users
```

**Resposta (200):**
```json
[
  {
    "id": "uuid-123",
    "name": "Eduardo",
    "email": "edu@gmail.com",
    "createdAt": "2024-02-25T10:30:00Z"
  }
]
```

---

### Templates

#### Criar Template

```http
POST /templates
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Aviso de Manutenção",
  "subject": "Sistema em manutenção",
  "body": "Olá {{destinatário}}, o sistema estará indisponível. Att, {{remetente}}"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-456",
  "title": "Aviso de Manutenção",
  "subject": "Sistema em manutenção",
  "body": "Olá {{destinatário}}, o sistema estará indisponível. Att, {{remetente}}",
  "userId": "uuid-123",
  "createdAt": "2024-02-25T10:30:00Z"
}
```

#### Listar Templates

```http
GET /templates
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "id": "uuid-456",
    "title": "Aviso de Manutenção",
    "subject": "Sistema em manutenção",
    "body": "Olá {{destinatário}}, o sistema estará indisponível. Att, {{remetente}}",
    "userId": "uuid-123",
    "createdAt": "2024-02-25T10:30:00Z"
  }
]
```

#### Atualizar Template

```http
PATCH /templates/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Novo Título",
  "subject": "Novo Assunto",
  "body": "Novo corpo com {{variável}}"
}
```

#### Remover Template

```http
DELETE /templates/:id
Authorization: Bearer <token>
```

**Resposta (204):** Sem conteúdo (sucesso)

---

### Enviar Emails

#### Enviar Email com Template

```http
POST /email/send
Content-Type: application/json
Authorization: Bearer <token>

{
  "templateId": "uuid-456",
  "recipientIds": ["uuid-789", "uuid-790"]
}
```

**Resposta (200):**
```json
{
  "success": true,
  "emailsSent": 2,
  "message": "Emails enviados com sucesso"
}
```

---

## Estrutura do Projeto


```
mensageiro/
├── backend/
│   ├── prisma/
│   │   ├── migrations/              # Histórico de mudanças do banco
│   │   │   ├── 20260221023123_init/
│   │   │   ├── 20260222193621_add_email_relations/
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma            # Schema do banco de dados
│   ├── src/
│   │   ├── config/
│   │   │   └── config.ts            # Configurações gerais
│   │   ├── controllers/             # Lógica dos endpoints
│   │   │   ├── auth.controller.ts
│   │   │   ├── email.controller.ts
│   │   │   ├── template.controller.ts
│   │   │   └── users.controller.ts
│   │   ├── generated/               # Tipos gerados pelo Prisma
│   │   ├── lib/
│   │   │   └── prisma.ts            # Cliente Prisma
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts    # Autenticação JWT
│   │   ├── routes/                  # Definição de rotas
│   │   │   ├── auth.route.ts
│   │   │   ├── email.route.ts
│   │   │   ├── templates.route.ts
│   │   │   └── users.route.ts
│   │   ├── services/                # Regras de negócio
│   │   │   ├── emailService.ts
│   │   │   ├── loginService.ts
│   │   │   ├── registerService.ts
│   │   │   ├── templatesService.ts
│   │   │   └── usersService.ts
│   │   └── server.ts                # Entrada da aplicação
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── assets/                  # Imagens e recursos estáticos
│   │   │   └── bg-leve.jpg
│   │   ├── pages/                   # Arquivos HTML
│   │   │   ├── login.html
│   │   │   ├── register.html
│   │   │   └── mensageiro.html      # Dashboard principal
│   │   ├── scripts/                 # Lógica JavaScript
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   │   └── mensageiro.js
│   │   └── style/                   # Arquivos CSS
│   │       ├── login.css
│   │       ├── register.css
│   │       └── mensageiro.css
│   ├── Dockerfile
│   └── package-lock.json
├── docker-compose.yml               # Orquestração dos containers
├── .env.example                     # Variáveis de ambiente exemplo
├── .gitignore
├── package.json                     # Dependências root (opcional)
├── package-lock.json
└── README.md
```

---

## Troubleshooting

### Erro OpenSSL

**Sintoma:** `Error while loading shared libraries: libssl.so`

**Solução:** Adicione no `backend/Dockerfile`:

```dockerfile
RUN apk add --no-cache openssl
```

E no `prisma/schema.prisma`:

```prisma
binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
```

---

### Erro CORS

**Sintoma:** `Access to XMLHttpRequest blocked by CORS`

**Solução:** Verifique se `backend/.env` contém:

```env
CORS_ORIGIN="http://localhost:8080"
```

Se mudou a porta do frontend, atualize este valor.

---

### Banco de Dados Vazio

**Sintoma:** Tabelas não existem ao tentar inserir dados

**Solução:** Execute as migrations:

```bash
docker exec -it mensageiro_backend npx prisma migrate dev --name init
```

---

### Porta Já em Uso

**Sintoma:** `Address already in use :3000` ou `:8080`

**Solução:** Mate o processo ou mude as portas em `docker-compose.yml`:

```yaml
backend:
  ports:
    - "3001:3000"  # Mudou para 3001

frontend:
  ports:
    - "8081:8080"  # Mudou para 8081
```

---

### Backend não conecta ao Banco

**Sintoma:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solução:** Aguarde o PostgreSQL iniciar (leva ~5s):

```bash
# Verifique se o container do postgres está rodando
docker compose ps

# Se não estiver, reinicie tudo
docker compose down
docker compose up --build
```

---

### Ver Logs

```bash
# Todos os serviços
docker compose logs -f

# Apenas backend
docker compose logs -f backend

# Apenas banco de dados
docker compose logs -f postgres
```

---

### Limpar Tudo

```bash
# Parar containers
docker compose down

# Remover volumes (apaga dados do banco)
docker compose down -v

# Remover tudo inclusive imagens
docker compose down -v --rmi all
```

---

## Próximos Passos

- [ ] Adicionar testes de unidade
- [ ] Criar CI/CD pipeline
- [ ] Documentação Swagger

---

<div align="center">

⭐ 

</div>