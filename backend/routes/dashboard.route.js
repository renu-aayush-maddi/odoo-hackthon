// import express from "express";
// import { getDashboardSummary } from "../controllers/dashboard.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/summary", protectRoute, getDashboardSummary);

// export default router;


import express from "express";
import { protectRoute, managerOrAdminRoute } from "../middleware/auth.middleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", protectRoute, managerOrAdminRoute, getDashboardSummary);

export default router;
