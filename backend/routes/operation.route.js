import express from "express";
import {
  createOperation,
  getOperations,
  getOperationById,
  updateOperation,
  markReady,
  markDone,
} from "../controllers/operation.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

// create receipt / delivery / adjustment
router.post(
  "/",
  authorizeRoles("admin", "inventory_manager", "warehouse_staff"),
  createOperation
);

router.get(
  "/",
  authorizeRoles("admin", "inventory_manager", "warehouse_staff", "viewer"),
  getOperations
);

router.get(
  "/:id",
  authorizeRoles("admin", "inventory_manager", "warehouse_staff", "viewer"),
  getOperationById
);

router.put(
  "/:id",
  authorizeRoles("admin", "inventory_manager", "warehouse_staff"),
  updateOperation
);

// status transitions
router.post(
  "/:id/ready",
  authorizeRoles("admin", "inventory_manager"),
  markReady
);

router.post(
  "/:id/done",
  authorizeRoles("admin", "inventory_manager"),
  markDone
);

export default router;
