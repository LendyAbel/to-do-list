# Backend - To Do List

RESTful API using Node.js, Express, JWT authentication, and LowDB (JSON file database).

## Features

- JWT authentication.
- User and Task CRUD (with all data in LowDB JSON).
- All task endpoints protected per user.
- Dockerfile and Fly.io support.
- Serves frontend static build if present.

## Requirements

- Node.js v22+
- npm
- Docker (for deployment, optional)

## Setup and Development

1. **Environment variables:**
   Create a `.env` file inside `/backend`:
   JWT_SECRET=your_secure_secret

2. **Install dependencies:**  
   npm install

3. **Run in dev mode:**
   npm run dev
   (Runs at http://localhost:3001)

4. **Serve frontend build:**
- Build frontend:
  ```
  cd ../frontend
  npm run build
  cd ../backend
  npm run build:ui
  ```
- Then run backend as usual.

## Scripts

- `npm run dev` - development server
- `npm run start` - production server
- `npm run build:ui` - copy frontend build
- `npm run deploy` - Fly.io deploy
- `npm run deploy:full` - build UI and deploy
- `npm run logs:prod` - view production logs

## REST API

_All `/api/list` endpoints require Authorization: Bearer {token}_

### Users

- `POST /api/users` — Register new user
- `GET /api/users` — List users (no password)
- `PUT /api/users/:id` — Update user/password

### Login

- `POST /api/login` — Authenticate and receive JWT

### Tasks

- `GET /api/list` — Get your tasks
- `POST /api/list` — Create new task
- `PUT /api/list/:id` — Update task
- `DELETE /api/list/:id` — Delete task

## Docker / Fly.io

- Configured for Fly.io. Edit `fly.toml` as necessary.
- Run `fly deploy` for production deployment.

---
