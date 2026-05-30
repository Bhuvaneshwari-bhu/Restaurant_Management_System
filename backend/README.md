**MVC structure** stands for:

> **Model – View – Controller**

It is a way of organizing your backend (or full-stack app) so that code is clean, scalable, and easy to maintain.

---

## 🧠 1. Model (M)

👉 Handles **data + database logic**

* Defines schema (MongoDB / SQL)
* Talks directly to database
* Example: Product, User, Order

```js
// Product Model (Mongoose example)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
```

📌 Think of it as:

> “Data layer / database brain”

---

## 🎮 2. Controller (C)

👉 Handles **business logic**

* Receives request
* Processes data
* Talks to Model
* Sends response

```js
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};
```

📌 Think of it as:

> “Brain that decides what to do”

---

## 🖥️ 3. View (V)

👉 Handles **UI / output**

In backend APIs (like Express):

* View = JSON response

In frontend apps:

* HTML / React UI

Example (API response):

```json
{
  "name": "Phone",
  "price": 20000
}
```

📌 Think of it as:

> “What user sees”

---

## 🔁 MVC Flow

```text
Request → Controller → Model → Database → Controller → Response (View)
```

Example:

1. User sends:

```
GET /api/products/1
```

2. Controller runs
3. Controller asks Model
4. Model fetches DB data
5. Controller returns JSON

---

## 🗂️ Typical folder structure in Express MVC

```text
project/
│
├── models/
│   └── productModel.js
│
├── controllers/
│   └── productController.js
│
├── routes/
│   └── productRoutes.js
│
├── app.js
```

---

## 💡 Why MVC is used

✔ Clean separation of logic
✔ Easy to debug
✔ Easy to scale
✔ Team-friendly (frontend/backend separation)
✔ Reusable code

---



A **REST API** (Representational State Transfer API) is a way for different software systems to **communicate over the internet using HTTP** in a simple, structured way.

---

## 🧠 Simple meaning

> A REST API lets a frontend (React, mobile app, etc.) talk to a backend (server + database) using URLs and HTTP methods.

Example:

```text
GET /api/products
```

👉 means: “Give me all products”

---

## 🔁 How REST API works

Client (browser/mobile) sends request → Server processes → Server sends response (usually JSON)

Example flow:

```text
Frontend → GET /api/products → Backend → Database → JSON response
```

---

## 🌐 Core HTTP methods in REST

### 1. GET → Read data

```http
GET /api/products
GET /api/products/1
```

---

### 2. POST → Create data

```http
POST /api/products
```

---

### 3. PUT → Update full data

```http
PUT /api/products/1
```

---

### 4. DELETE → Remove data

```http
DELETE /api/products/1
```

---

## 📦 Example response (REST API)

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 50000
}
```

---

## 🧱 Key rules of REST API

### 1. Stateless

Server does NOT remember previous requests.

Each request is independent.

---

### 2. Resource-based URLs

Everything is treated as a **resource**:

* `/products`
* `/users`
* `/orders`

---

### 3. Uses HTTP methods properly

Instead of:

```text
/getProducts
/deleteProduct
```

REST uses:

```text
GET /products
DELETE /products/:id
```

---

## 🏗️ Example Express REST API

```js
app.get("/api/products", getAllProducts);
app.post("/api/products", createProduct);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);
```

---

## 💡 Real-life analogy

Think of REST API like a restaurant:

* Menu = API endpoints
* You = Client
* Waiter = API
* Kitchen = Backend + Database

You order (request), waiter brings food (response).

---

## ⚡ Why REST API is popular

✔ Simple
✔ Works with any frontend (React, Android, iOS)
✔ Uses standard HTTP
✔ Easy to scale
✔ Lightweight (mostly JSON)
---


Folder Structure
task-manager/
│
├── routes/
├── controllers/
├── middleware/
├── data/
├── app.js
├── package.json
└── server.js


Concepts You Will Learn
1. Express Server
const express = require("express");
const app = express();


2. Middleware
app.use(express.json());


3. Routes
app.get("/tasks", getTasks);


4. HTTP Methods
GET
POST
PUT
DELETE

5. Request/Response
req.body
req.params
res.json()


