
# Restaurant Management System (MERN Stack)

A full-stack, role-based restaurant ordering and management platform built using the MERN stack.
The system supports **Customers, Restaurant Owners, and Platform Administrators** with separate dashboards and controlled access.

---

## Live Links

Frontend (Vercel): [https://restaurant-management-system-lovat.vercel.app](https://restaurant-management-system-lovat.vercel.app)
Backend (Render): [https://restaurant-management-system-oqs9.onrender.com](https://restaurant-management-system-oqs9.onrender.com)

## Credentials (Demo Access)

**Admin**

* Email: [bhuvana@gmail.com](mailto:bhuvana@gmail.com)
* Password: 123456

**User**

* Email: [sushma@gmail.com](mailto:sushma@gmail.com)
* Password: 123456

**Restaurant Admins**

* Email: [rest@gmail.com](mailto:rest@gmail.com)

* Password: 123456

* Email: [rest2@gmail.com](mailto:rest2@gmail.com)

* Password: 123456

---

## Project Summary

This project is a multi-role restaurant ecosystem where:

* Users can browse restaurants, explore menus, add items to cart and place orders.
* Restaurant owners can manage their menu items and track incoming orders.
* Platform administrators can manage all restaurants, products, users, and view system-wide analytics.

The system is built with a focus on **role-based access control, scalable backend design, and clean frontend separation of concerns**.

---

## System Architecture

### High-Level Architecture

```
Frontend (React)
   ↓
Backend (Node + Express)
   ↓
Authentication Middleware (JWT)
   ↓
Authorization Middleware (RBAC)
   ↓
Business Logic (Cart / Orders)
   ↓
Payment Gateway (Razorpay)
   ↓
MongoDB Atlas
```

---

## Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* cookie-parser
* CORS

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## Role-Based System Design

### 1. Customer (User)

Responsibilities:

* Browse restaurants
* View food items by restaurant
* Add items to cart
* Place orders
* Track order history

Routes:

* `/`
* `/restaurants/:id`
* `/cart`
* `/orders`

---

### 2. Restaurant Admin

Responsibilities:

* Manage restaurant products (CRUD)
* View incoming orders
* Update order status (processing → delivered)

Routes:

* `/restaurant/dashboard`
* `/restaurant/orders`

---

### 3. Platform Admin

Responsibilities:

* View system analytics
* Manage restaurants and products
* Monitor orders across platform

Routes:

* `/admin/dashboard`
* `/admin/restaurants/:id`

---

## Backend Architecture

The backend follows a modular MVC structure:

* **Models** → MongoDB schemas (User, Restaurant, Product, Order)
* **Controllers** → Business logic layer
* **Routes** → API endpoints grouped by feature
* **Middleware**

  * Authentication middleware (JWT verification)
  * Role-based authorization middleware

---

## Core Features

* Secure JWT authentication with HTTP-only cookies
* Role-based route protection (RBAC system)
* Restaurant-to-product relational mapping
* Order management system with status tracking
* Secure payment integration using Razorpay (order creation + signature verification)
* Admin analytics dashboard (users, revenue, orders)
* Fully responsive UI using Tailwind CSS
* RESTful API design
* Protected frontend routing

---
## Payment System (Razorpay Integration)

The platform uses Razorpay for secure payment processing.

### Flow:
1. User places order → backend creates Razorpay order
2. Razorpay checkout opens on frontend
3. Payment is completed by user
4. Backend verifies payment signature using Razorpay secret key
5. Order is created in MongoDB
6. User cart is cleared automatically

### Security:
* Payment signature verification using `crypto` module
* Razorpay secret key stored in environment variables
* Order is only created after successful verification

### Features:
* Test mode enabled (Razorpay test keys)
* Secure order creation endpoint
* Idempotent payment handling (prevents duplicate orders)

---

## Database Design

### Collections:

* users
* restaurants
* products
* orders

### Relationships:

* Restaurant → Products (one-to-many)
* User → Orders (one-to-many)
* Order → Products (embedded references)

---

## Application Flow

### User Flow

1. Login / Register
2. Browse restaurants
3. View restaurant menu
4. Add items to cart
5. Place order
6. Track order history

---

### Restaurant Admin Flow

1. Login
2. Open dashboard
3. Add / update / delete products
4. Manage incoming orders
5. Update order status

---

### Admin Flow

1. Login
2. View analytics dashboard
3. Manage restaurants
4. Monitor platform-wide activity

---
## Application Flow
### User Flow

Login → Browse Restaurants → View Menu → Add to Cart → Place Order → Track Order → Submit Review

### Restaurant Admin Flow

Login → Dashboard → Manage Products → View Orders → Update Order Status

### Admin Flow

Login → Dashboard → Manage Platform → Monitor System Activity

---

## What I Learned

* Full-stack MERN architecture design
* Role-based authentication and authorization (RBAC)
* JWT authentication with secure cookie handling
* MongoDB schema relationships and aggregation
* REST API design and structuring
* React routing and protected navigation
* State management with API integration
* Production deployment (Vercel + Render + MongoDB Atlas)
* Debugging real-world deployment issues (CORS, cookies, routing, build errors)
* Integrated secure payment gateway (Razorpay) with order creation and server-side signature verification

---


## Resume Highlights

* Built a full-stack MERN application with role-based access control for users, restaurant owners, and administrators.
* Designed and implemented RESTful APIs using Node.js and Express with MongoDB for managing restaurants, products, users, and orders.
* Integrated Razorpay payment gateway with secure server-side signature verification and automated order creation workflow.
* Developed responsive React frontend with protected routing and dashboard-based architecture.
* Deployed full-stack application on Vercel and Render, resolving production issues including authentication, CORS, and routing in a live environment.

