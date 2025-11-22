import express from "express";
import {
  getStockByWarehouse,
  upsertStockItem,
} from "../controllers/stock.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/warehouse/:warehouseId", getStockByWarehouse);

// mainly for testing / seeding
router.post(
  "/",
  authorizeRoles("admin", "inventory_manager"),
  upsertStockItem
);

export default router;
