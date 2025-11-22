import StockItem from "../models/stockItem.model.js";

export const getStockByWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const stock = await StockItem.find({ warehouse: warehouseId })
      .populate("product", "name code unitCost")
      .populate("warehouse", "name code")
      .lean();

    const formatted = stock.map((s) => ({
      _id: s._id,
      warehouse: s.warehouse,
      product: {
        _id: s.product._id,
        name: s.product.name,
        code: s.product.code,
        unitCost: s.product.unitCost,
      },
      onHand: s.onHand,
      reserved: s.reserved,
      freeToUse: s.onHand - s.reserved,
    }));

    res.json(formatted);
  } catch (error) {
    console.log("getStockByWarehouse error", error.message);
    res.status(500).json({ message: error.message });
  }
};

// helper endpoint to manually set stock (useful for testing / initial data)
export const upsertStockItem = async (req, res) => {
  try {
    const { warehouse, product, onHand, reserved } = req.body;

    const stock = await StockItem.findOneAndUpdate(
      { warehouse, product },
      {
        $set: {
          onHand: onHand ?? 0,
          reserved: reserved ?? 0,
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(stock);
  } catch (error) {
    console.log("upsertStockItem error", error.message);
    res.status(400).json({ message: error.message });
  }
};
