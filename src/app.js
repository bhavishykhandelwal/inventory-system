const express = require("express");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/stock", stockRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Inventory System Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});