// import Operation from "../models/operation.model.js";

// export const getDashboardSummary = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const [receiptsReady, receiptsLate, receiptsTotal] = await Promise.all([
//       Operation.countDocuments({ type: "receipt", status: "ready" }),
//       Operation.countDocuments({
//         type: "receipt",
//         status: { $ne: "done" },
//         scheduledDate: { $lt: today },
//       }),
//       Operation.countDocuments({ type: "receipt" }),
//     ]);

//     const [deliveriesReady, deliveriesLate, deliveriesTotal] = await Promise.all([
//       Operation.countDocuments({ type: "delivery", status: "ready" }),
//       Operation.countDocuments({
//         type: "delivery",
//         status: { $ne: "done" },
//         scheduledDate: { $lt: today },
//       }),
//       Operation.countDocuments({ type: "delivery" }),
//     ]);

//     res.json({
//       receipts: {
//         toReceive: receiptsReady,
//         late: receiptsLate,
//         total: receiptsTotal,
//       },
//       deliveries: {
//         toDeliver: deliveriesReady,
//         late: deliveriesLate,
//         total: deliveriesTotal,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching dashboard", error: err.message });
//   }
// };



import Operation from "../models/operation.model.js";
import StockItem from "../models/stockItem.model.js";

export const getDashboardSummary = async (req, res) => {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// total stock quantity
		const stockAgg = await StockItem.aggregate([
			{ $group: { _id: null, totalOnHand: { $sum: "$onHand" } } },
		]);
		const totalProductsInStock = stockAgg[0]?.totalOnHand || 0;

		// low stock = freeToUse <= 5 (you can change threshold)
		const lowStockThreshold = 5;
		const lowStockCount = await StockItem.countDocuments({
			$expr: {
				$lte: [{ $subtract: ["$onHand", "$reserved"] }, lowStockThreshold],
			},
		});

		// --- operations stats ---
		const [pendingReceipts, pendingDeliveries, internalTransfersScheduled,
			lateReceipts, lateDeliveries, toReceiveAgg, toDeliverAgg] = await Promise.all([
			Operation.countDocuments({
				type: "receipt",
				status: { $nin: ["done", "canceled"] },
			}),
			Operation.countDocuments({
				type: "delivery",
				status: { $nin: ["done", "canceled"] },
			}),
			Operation.countDocuments({
				type: "internal",
				status: { $nin: ["done", "canceled"] },
			}),
			Operation.countDocuments({
				type: "receipt",
				status: { $nin: ["done", "canceled"] },
				scheduleDate: { $lt: today },
			}),
			Operation.countDocuments({
				type: "delivery",
				status: { $nin: ["done", "canceled"] },
				scheduleDate: { $lt: today },
			}),
			Operation.aggregate([
				{ $match: { type: "receipt", status: { $nin: ["done", "canceled"] } } },
				{ $unwind: "$products" },
				{ $group: { _id: null, qty: { $sum: "$products.quantity" } } },
			]),
			Operation.aggregate([
				{ $match: { type: "delivery", status: { $nin: ["done", "canceled"] } } },
				{ $unwind: "$products" },
				{ $group: { _id: null, qty: { $sum: "$products.quantity" } } },
			]),
		]);

		const toReceive = toReceiveAgg[0]?.qty || 0;
		const toDeliver = toDeliverAgg[0]?.qty || 0;

		const totalOperations =
			pendingReceipts + pendingDeliveries + internalTransfersScheduled;

		return res.json({
			stock: {
				totalProductsInStock,
				lowStockCount,
			},
			operations: {
				pendingReceipts,
				pendingDeliveries,
				internalTransfersScheduled,
				lateReceipts,
				lateDeliveries,
				toReceive,
				toDeliver,
				totalOperations,
			},
		});
	} catch (error) {
		console.error("Error in getDashboardSummary:", error.message);
		res.status(500).json({ message: "Failed to load dashboard summary" });
	}
};
