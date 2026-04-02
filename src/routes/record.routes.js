import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "../controllers/record.controller.js";

const router = express.Router();

router.post("/", auth, authorize("admin"), createRecord);
router.get("/", auth, getRecords);
router.put("/:id", auth, authorize("admin"), updateRecord);
router.delete("/:id", auth, authorize("admin"), deleteRecord);

export default router;