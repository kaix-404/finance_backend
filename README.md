# 💰 Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a backend system for a finance dashboard that manages financial records, user roles, and access control.

It demonstrates backend engineering skills including API design, RBAC, data modeling, and analytics.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Joi (Validation)

---

## 🧠 Architecture

```
Request → Controller → Service → Utils → Database
```

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)

| Role    | Permissions      |
| ------- | ---------------- |
| Viewer  | Read-only        |
| Analyst | Read + analytics |
| Admin   | Full access      |

---

## 📡 API Endpoints + Sample Responses

---

### 🔑 Auth

#### POST /auth/login

**Request**

```json
{
  "email": "kai@test.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 💸 Records

#### POST /records

**Response**

```json
{
  "_id": "661c9c...",
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-02T00:00:00.000Z",
  "notes": "monthly salary",
  "userId": "661c9b...",
  "createdAt": "2026-04-02T10:00:00.000Z"
}
```

---

#### GET /records?page=1&limit=5

**Response**

```json
{
  "total": 25,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "661c9c...",
      "amount": 200,
      "type": "expense",
      "category": "food",
      "date": "2026-04-01T00:00:00.000Z"
    }
  ]
}
```

---

### 📊 Dashboard

#### GET /dashboard/summary

**Response**

```json
{
  "totalIncome": 5000,
  "totalExpense": 2000,
  "balance": 3000
}
```

---

#### GET /dashboard/categories

**Response**

```json
[
  {
    "_id": { "category": "food", "type": "expense" },
    "total": 2000
  },
  {
    "_id": { "category": "salary", "type": "income" },
    "total": 5000
  }
]
```

---

#### GET /dashboard/trends

**Response**

```json
[
  {
    "_id": { "year": 2026, "month": 4, "type": "income" },
    "total": 5000
  }
]
```

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd finance-backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

## 🧩 Design Decisions

* Service layer for separation of concerns
* RBAC implemented via middleware
* MongoDB aggregation for analytics
* Soft delete for data safety
* Modular and scalable folder structure

---

## 🔮 Future Improvements

* Refresh tokens
* Rate limiting
* Swagger API docs
* Unit testing
* Redis caching

---

## ✅ Conclusion

This backend demonstrates a clean, scalable, and production-style architecture for managing financial data with proper access control and analytics capabilities.

---
