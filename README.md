# 🌌 SchemaFlow

An ultra-premium, interactive database schema designer and visualizer. Write **DBML (Database Markup Language)** and watch it compile in real-time into interactive, beautiful, glassmorphic database tables and relational node maps.

---

## ✨ Features

- **Live DBML Visualization**: Write standard DBML and instantly compile it to interactive schemas using `@xyflow/react` (React Flow).
- **Glassmorphic Node System**: Tables are styled with translucent, blur-enhanced dark-blue surfaces, slate borders, neon blue selection rings, and yellow accents highlighting **Primary Keys (PK)**.
- **Project Dashboard**: Expandable and collapsible sidebar to manage multiple user projects. Save, update, and search projects dynamically without creating duplicate database schemas.
- **Shareable Previews**: Copy a public link to share your compiled schema in a clean, split-pane read-only interface.
- **Vercel Serverless Out of the Box**: Configured with production-ready `vercel.json` files for zero-configuration deployments of both frontend routing and Express API endpoints.
- **Secure Authentication**: Built-in user registration and login powered by JWT tokens, bcrypt encryption, and persistent local sessions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (Vanilla Modern Glassmorphism styling)
- **Node Graph Engine**: `@xyflow/react` (React Flow)
- **DBML Parser**: `@dbml/core`
- **Icons**: `@hugeicons/react`
- **HTTP Client**: Axios

### Backend
- **Framework**: Express (Node.js)
- **Database**: MongoDB (Atlas) via Mongoose ODM
- **Security**: JWT (`jsonwebtoken`) & `bcrypt` password hashing
- **Environment**: Dotenv

---

## 📂 Project Structure

```bash
SchemaFlow/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handler controllers (auth, schema logic)
│   │   ├── middleware/       # Authentication guards (JWT validation)
│   │   ├── models/           # Mongoose schemas (User, SchemaProject)
│   │   ├── routes/           # Express endpoint router paths
│   │   └── index.js          # API Server entrypoint
│   └── vercel.json           # Serverless API routes wrapper config
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI elements (Header, Sidebar, Resizer, etc.)
│   │   ├── hooks/            # Custom hooks (useProjects, useResizer)
│   │   ├── pages/            # View pages (HomePage, LoginPage, SharedView)
│   │   ├── services/         # Axios API HTTP service wrappers
│   │   └── utils/            # DBML parsers and canvas helper tools
│   └── vercel.json           # Client routing rewrite overrides for SPA navigation
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisite
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Environment Configurations
Create a `.env` file in the **backend** and a `.env` file in the **frontend**.

#### Backend Configuration (`backend/.env`):
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_sign_key
```

#### Frontend Configuration (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3000
```
> [!NOTE]
> Make sure `VITE_API_URL` does not end with a trailing slash in production to prevent preflight CORS redirect blocks.

---

### 3. Execution Setup

#### Run Backend Server:
Navigate to the `backend` folder, install dependencies, and launch the dev environment:
```bash
cd backend
npm install
node src/index.js
```
The server will boot up locally at `http://localhost:3000`.

#### Run Frontend Client:
Navigate to the `frontend` folder, install dependencies, and start Vite dev server:
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌍 Vercel Deployment

Both directories contain preset `vercel.json` config settings.

### Backend Routing Config
The `backend/vercel.json` wraps the Express app endpoints into a serverless function structure:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

### Frontend Rewrite Config
The `frontend/vercel.json` ensures that deep routing paths (e.g., `/login`, `/shared/:id`) are served properly by index.html instead of returning Vercel 404s:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📜 API Documentation

### Authentication Endpoints
- `POST /api/user/signup` — Create a new user account.
- `POST /api/user/login` — Sign in and receive a JWT token.

### Schema/Project Management Endpoints
- `GET /api/schema` — Fetch all projects created by the authenticated user.
- `POST /api/schema` — Create a new schema project.
- `PUT /api/schema/:id` — Update schema workspace DBML data and diagram coordinates.
- `DELETE /api/schema/:id` — Delete a schema project.
- `GET /api/schema/:id` — Public route to fetch a single schema for shared views.

---

## 📄 License
Licensed under the [ISC License](LICENSE).
