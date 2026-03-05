const prisma = require("../db/prisma");

async function allocateInventory(productId, orderQuantity) {

  return await prisma.$transaction(async (tx) => {

    let remaining = orderQuantity;

    const batches = await tx.stockBatch.findMany({
      where: {
        productId,
        remainingQuantity: { gt: 0 }
      },
      orderBy: {
        receivedAt: "asc"
      }
    });

    const allocations = [];

    for (const batch of batches) {

      if (remaining <= 0) break;

      const allocate = Math.min(batch.remainingQuantity, remaining);

      await tx.stockBatch.update({
        where: { id: batch.id },
        data: {
          remainingQuantity: batch.remainingQuantity - allocate
        }
      });

      allocations.push({
        batchId: batch.id,
        quantity: allocate
      });

      remaining -= allocate;
    }

    if (remaining > 0) {
      throw new Error("Insufficient stock");
    }

    return allocations;
  });
}

module.exports = allocateInventory;