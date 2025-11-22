📦 StockMaster – Inventory Management System (IMS)

A modular Inventory Management System built using the MERN stack + Redis, supporting multi-warehouse stock management, receipts, deliveries, internal transfers, and stock adjustments.

🚀 Features
✅ Core Modules

Products (Create, update, stock availability)

Receipts (Incoming stock)

Delivery Orders (Outgoing stock)

Internal Transfers (Warehouse → Warehouse)

Inventory Adjustments (Fix mismatches)

Move History (Track every stock movement)

Stock Dashboard with KPIs

🔐 Authentication

Login / Signup

Role-based access (Admin, Inventory Manager, Warehouse Staff)

JWT access + refresh tokens

Secure HTTP-only cookies

🛠 Tech Stack

Frontend

React (Vite)

TailwindCSS

Zustand (State management)

Axios

React Router DOM

Backend

Node.js & Express

MongoDB + Mongoose

Redis (Refresh token storage)

JWT Auth

📂 Project Structure
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── lib/
  ├── middleware/
  └── server.js

/frontend
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── stores/
  │   ├── lib/
  │   ├── App.jsx
  │   └── main.jsx

⚙️ Setup Instructions
1️⃣ Backend Setup
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongo_url
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
REDIS_URL=redis://localhost:6379
NODE_ENV=development


Run backend:

npm start

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔗 API Endpoints (Summary)
Auth
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
POST /api/auth/refresh-token

Products
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Stock & Operations
GET  /api/stock
GET  /api/stock/warehouse/:id
POST /api/operations
GET  /api/operations
GET  /api/operations/:id
POST /api/operations/:id/ready
POST /api/operations/:id/done

📊 Dashboard KPIs

Total products in stock

Low stock alerts

Pending receipts

Pending deliveries

Internal transfers

Late operations
