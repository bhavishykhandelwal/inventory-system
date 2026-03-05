const prisma = require("../db/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    const product = await prisma.product.create({
      data: { name }
    });

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};