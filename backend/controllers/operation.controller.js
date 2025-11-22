import Operation from "../models/operation.model.js";
import StockItem from "../models/stockItem.model.js";

const applyStockForOperation = async (operation) => {
  // called when status becomes "done"
  for (const line of operation.products) {
    const filter = {
      warehouse: operation.warehouse,
      product: line.product,
    };

    const stock = await StockItem.findOne(filter);

    let onHand = stock ? stock.onHand : 0;

    if (operation.type === "receipt" || operation.type === "adjustment") {
      onHand += line.quantity;
    } else if (operation.type === "delivery") {
      onHand -= line.quantity;
    }

    await StockItem.findOneAndUpdate(
      filter,
      {
        $set: { onHand },
      },
      { upsert: true, new: true }
    );
  }
};

export const createOperation = async (req, res) => {
  try {
    const op = await Operation.create({
      ...req.body,
      createdBy: req.user?._id,
    });
    res.status(201).json(op);
  } catch (error) {
    console.log("createOperation error", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getOperations = async (req, res) => {
  try {
    const { type, status, warehouseId } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (warehouseId) filter.warehouse = warehouseId;

    const ops = await Operation.find(filter)
      .populate("warehouse", "name code")
      .populate("products.product", "name code")
      .sort({ createdAt: -1 });

    res.json(ops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOperationById = async (req, res) => {
  try {
    const op = await Operation.findById(req.params.id)
      .populate("warehouse", "name code")
      .populate("products.product", "name code");

    if (!op) return res.status(404).json({ message: "Operation not found" });

    res.json(op);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOperation = async (req, res) => {
  try {
    const op = await Operation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!op) return res.status(404).json({ message: "Operation not found" });
    res.json(op);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change status: Draft -> Ready
export const markReady = async (req, res) => {
  try {
    const op = await Operation.findById(req.params.id);
    if (!op) return res.status(404).json({ message: "Operation not found" });

    op.status = "ready";
    await op.save();
    res.json(op);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Change status: Ready -> Done (and update stock)
export const markDone = async (req, res) => {
  try {
    const op = await Operation.findById(req.params.id);
    if (!op) return res.status(404).json({ message: "Operation not found" });

    op.status = "done";
    await op.save();
    await applyStockForOperation(op);

    res.json(op);
  } catch (error) {
    console.log("markDone error", error.message);
    res.status(400).json({ message: error.message });
  }
};
