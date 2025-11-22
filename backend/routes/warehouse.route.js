import express from "express";
import {
  createWarehouse,
  getWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
} from "../controllers/warehouse.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post(
  "/",
  authorizeRoles("admin", "inventory_manager"),
  createWarehouse
);
router.get("/", getWarehouses);
router.get("/:id", getWarehouseById);
router.put(
  "/:id",
  authorizeRoles("admin", "inventory_manager"),
  updateWarehouse
);
router.delete("/:id", authorizeRoles("admin"), deleteWarehouse);

export default router;
