const prisma = require("../db/prisma");

exports.addStock = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const batch = await prisma.stockBatch.create({
      data: {
        productId,
        quantity,
        remainingQuantity: quantity
      }
    });

    res.json(batch);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};