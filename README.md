# To Do List App

A modern Full Stack To Do List application with user authentication. Backend is built with Node.js/Express + LowDB, and the frontend uses React + Vite + TailwindCSS.

**Features:**
- Each user manages their own private to-do list.
- Secure registration, login, and JWT session handling.
- Password change feature.
- Full CRUD for tasks: add, check, filter, and delete.
- Responsive, friendly interface with smooth animations.
- Ready for deployment (Fly.io, Docker).

## Project Structure
lendyabel-to-do-list/
├── backend/ # Authenticated REST API (Express, JWT, LowDB)
└── frontend/ # React SPA (Vite, TailwindCSS)

## Quick Start

1. **Clone the repository:**
- git clone https://github.com/YOUR-USER/lendyabel-to-do-list.git
- cd lendyabel-to-do-list

2. **Backend setup:**
- Create a `backend/.env` file:
  ```
  JWT_SECRET=your_secure_secret
  ```
- Install backend dependencies:
  ```
  cd backend
  npm install
  npm run dev
  ```
  (Runs at http://localhost:3001)

3. **Frontend setup:**
- Create a `frontend/.env` file:
  ```
  VITE_API_URL=http://localhost:3001/api
  ```
- Install frontend dependencies:
  ```
  cd ../frontend
  npm install
  npm run dev
  ```
  (Runs at http://localhost:5173)

4. **Production build (optional):**
- Build frontend and have backend serve the static files:
  ```
  cd frontend
  npm run build
  cd ../backend
  npm run build:ui
  ```

## Deployment

- The backend has a Dockerfile and Fly.io config (`fly.toml`).
- For more info on scripts and environment, see the backend and frontend readme files.

---

## More Documentation

- [backend/README.md](backend/README.md) — Backend details, API reference
- [frontend/README.md](frontend/README.md) — Frontend details, dev guide

---