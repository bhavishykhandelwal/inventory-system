# Smart Inventory Allocation System

## Overview

This project implements a **Smart Inventory Allocation System** using **Node.js, Express, PostgreSQL, and Prisma ORM**.

The system manages products, incoming stock batches, and customer orders while ensuring that inventory is allocated correctly and consistently.

Inventory allocation follows a **FIFO (First-In-First-Out)** strategy, meaning that the earliest received stock batches are used first when fulfilling customer orders.

The system also ensures **data integrity and correctness under concurrent requests** by using database transactions.

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

---

# Project Structure
inventory-system
│
├── src
│ ├── controllers
│ │ productController.js
│ │ stockController.js
│ │ orderController.js
│ │
│ ├── routes
│ │ productRoutes.js
│ │ stockRoutes.js
│ │ orderRoutes.js
│ │
│ ├── services
│ │ allocationService.js
│ │
│ ├── db
│ │ prisma.js
│ │
│ └── app.js
│
├── prisma
│ ├── schema.prisma
│ └── migrations
│
├── package.json
├── .env.example
└── README.md


---

# Database Schema

The system models the following entities:

### Products
Stores product information.

### Stock Batches
Every stock entry is stored as a batch to track when the stock arrived.

### Orders
Represents customer orders.

### Order Allocations
Tracks how inventory batches are used to fulfill orders.

This design enables accurate FIFO allocation and full traceability of inventory usage.

---

# Setup Instructions

## 1. Clone the repository

---https://github.com/bhavishykhandelwal/inventory-system.git

## 2. Install dependencies

---npm install

## 3. Configure environment variables

Create a `.env` file using `.env.example`.



---

## 4. Run database migrations

---npx prisma migrate dev

## 5. Start the server

Server runs at:localhost://3000



---

# API Endpoints

## Create Product
{
"name": "Laptop"
}


---

## Add Stock Batch

Example request:
{
"productId": 1,
"quantity": 100
}


-Each stock entry creates a **new batch**.

---

## Place Order

-Example request:
{
"productId": 1,
"quantity": 40
}



Inventory is allocated using FIFO.

---

## Retrieve Order Details



-Returns order information and the stock batches used to fulfill the order.

---

# Inventory Allocation Strategy

-Inventory allocation follows **FIFO (First-In-First-Out)**.

Example:
-Batch 1 → 50 units
-Batch 2 → 100 units

Order → 120 units

--

-Allocation result:
-Batch 1 → 50 units
-Batch 2 → 70 units



This ensures that older inventory is always used before newer stock.

---

# Edge Case Handling

## When Stock Runs Out

If an order requests more inventory than available stock:

- The system rejects the order
- Returns an **Insufficient stock** error

---

## When Orders Span Multiple Batches

Orders automatically allocate inventory across multiple batches when necessary while maintaining FIFO order.

---

## Concurrent Orders

Multiple orders arriving at the same time are handled using **database transactions**, preventing inconsistent stock updates and overselling.

---

# High Concurrency Behavior

If **1000 simultaneous order requests** arrive for the same product:

- Each order runs inside a **database transaction**
- FIFO batch selection ensures deterministic allocation
- Stock updates are atomic
- If stock becomes insufficient, the transaction fails safely

This prevents:

- Overselling inventory
- Race conditions
- Inconsistent database states

---

# Assumptions

- Orders must be fully fulfilled or rejected (no partial fulfillment).
- FIFO allocation is always followed.
- Products must exist before stock can be added.
- Each stock entry is stored as a batch with remaining quantity tracking.

---

# Testing

APIs can be tested using **Postman** or curl.

Typical workflow:

1. Create a product  
2. Add stock batch  
3. Place an order  
4. Retrieve order details  

---

# Future Improvements

Possible production improvements:

- Distributed locking for multi-instance deployments
- Queue-based order processing
- Inventory caching
- Rate limiting
- Monitoring and logging

---

# Conclusion

This project demonstrates a backend system that ensures:

- FIFO inventory allocation
- Accurate batch tracking
- Safe concurrent order handling
- Clean and maintainable architecture

The design prioritizes **correctness, consistency, and scalability**, making it suitable for real-world inventory management systems.