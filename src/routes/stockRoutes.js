const express = require("express");
const { addStock } = require("../controllers/stockController");

const router = express.Router();

router.post("/", addStock);

module.exports = router;