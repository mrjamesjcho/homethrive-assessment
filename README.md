# Homethrive assessment

## Getting Started

Create a .env file in both /backend and /frontend folders

Backend .env should contain these values

```
DB_HOST=localhost
DB_PORT=5432
DB_PASSWORD=password
DB_USER=postgres
DB_NAME=homethrive
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
```

Frontend .env should contain these values

```
API_URL=http://localhost:3000/dev
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password

```

### Setup backend

Navigate to /backend

```bash
cd backend
```

Install dependencies

```bash
npm i
```

Start database

```bash
npm run db:start
```

Run migrations

```bash
npm run db:migrate
```

Seed database

```bash
npm run db:seed
```

Build server

```bash
npm run build
```

Start server

```bash
npm run offline
```

### Setup frontend

Navigate to /frontend

```bash
cd frontend
```

Install dependencies

```bash
npm i
```

Start webapp

```bash
npm run dev
```

### Screenshot
![homethrive](https://github.com/user-attachments/assets/00f9c5eb-7ad7-48ea-a414-c3ac416c7357)

### Reduced scope

- no unit/integration tests
- no robust frontend form validation
- error handling can be improved since schema errors do not always return a useful message
- unable to test deploying lambda
