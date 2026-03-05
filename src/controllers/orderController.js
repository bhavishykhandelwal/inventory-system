const prisma = require("../db/prisma");
const allocateInventory = require("../services/allocationService");

exports.placeOrder = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const allocations = await allocateInventory(productId, quantity);

    const order = await prisma.order.create({
      data: {
        productId,
        quantity,
        status: "FULFILLED"
      }
    });

    for (const a of allocations) {

      await prisma.orderAllocation.create({
        data: {
          orderId: order.id,
          batchId: a.batchId,
          quantity: a.quantity
        }
      });

    }

    res.json({
      orderId: order.id,
      allocations
    });

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }
};

exports.getOrder = async (req, res) => {

  try {

    const orderId = Number(req.params.id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        allocations: {
          include: {
            batch: true
          }
        }
      }
    });

    res.json(order);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};