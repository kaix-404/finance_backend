import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getSummary, getCategoryBreakdown, getMonthlyTrends } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", auth, getSummary);
router.get("/categories", auth, getCategoryBreakdown);
router.get("/trends", auth, getMonthlyTrends);

export default router;