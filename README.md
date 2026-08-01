# 🛍️ E-Commerce Store

A full-stack e-commerce web application built with the MERN stack, featuring authentication, product management, shopping cart, and a role-based admin panel.

![Status](https://img.shields.io/badge/status-active-success)
![Tech](https://img.shields.io/badge/stack-MERN-blue)

---

## ✨ Features

- 🔐 **Authentication** — Secure Register/Login/Logout using JWT
- 👑 **Role-Based Access** — Separate Admin and User permissions
- 🛒 **Shopping Cart** — Add to cart, quantity control, remove items
- 📦 **Product Management** — Admin can Add, Edit, and Delete products
- 🔍 **Search** — Find products instantly
- 🌙 **Dark/Light Mode** — Toggle between themes
- 📱 **Responsive Design** — Clean, card-based product layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |

---

## 📂 Project Structure
CodeAlpha_EcommerceStore/
├── backend/
│ ├── controllers/ # Route logic (auth, products)
│ ├── models/ # Mongoose schemas (User, Product)
│ ├── routes/ # API routes
│ └── server.js # Entry point
└── frontend/
└── src/
├── pages/ # Auth, Dashboard, Cart, Admin, ProductDetails
└── App.jsx
---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/alishba158/ecommerce-store.git
cd ecommerce-store
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 👤 Roles

| Role | Access |
|---|---|
| **Admin** | Add/Edit/Delete products, full dashboard access |
| **User** | Browse products, add to cart, checkout |

---

## 📸 Screenshots

*(Add screenshots or a demo video link here)*

---

## 👩‍💻 Author

Built as part of an internship project by **Alishba**.