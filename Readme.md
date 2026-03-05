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
