import Operation from "../models/operation.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [receiptsReady, receiptsLate, receiptsTotal] = await Promise.all([
      Operation.countDocuments({ type: "receipt", status: "ready" }),
      Operation.countDocuments({
        type: "receipt",
        status: { $ne: "done" },
        scheduledDate: { $lt: today },
      }),
      Operation.countDocuments({ type: "receipt" }),
    ]);

    const [deliveriesReady, deliveriesLate, deliveriesTotal] = await Promise.all([
      Operation.countDocuments({ type: "delivery", status: "ready" }),
      Operation.countDocuments({
        type: "delivery",
        status: { $ne: "done" },
        scheduledDate: { $lt: today },
      }),
      Operation.countDocuments({ type: "delivery" }),
    ]);

    res.json({
      receipts: {
        toReceive: receiptsReady,
        late: receiptsLate,
        total: receiptsTotal,
      },
      deliveries: {
        toDeliver: deliveriesReady,
        late: deliveriesLate,
        total: deliveriesTotal,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard", error: err.message });
  }
};
