# Frontend - To Do List

Single Page Application built with React, Vite, and TailwindCSS.

## Features

- Modern responsive UI.
- Secure registration, login, and logout.
- Private To Do list, filters, and password change.
- Animations with Framer Motion.
- JWT authentication with backend.

## Requirements

- Node.js v18+
- npm

## Setup

1. **Set up environment:**
   Create a `.env` file in `/frontend`:
   VITE_API_URL=http://localhost:3001/api

2. **Install dependencies:**   
   npm install

3. **Run in development:**
   npm run dev
   (App at http://localhost:5173)

4. **Build for production:**
   cd ../backend
   npm run build:ui

## Linting & Formatting

- ESLint and Prettier (`npm run lint`) are configured.
- TailwindCSS with Prettier plugin for class sorting.

## Usage

- Everything is integrated with the backend.
- JWTs are stored in `localStorage` and sent transparently in HTTP headers.

---