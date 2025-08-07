import express from "express";
import { ComplaintController } from "../controllers/complaintsController.js";

const router = express.Router();

router.post("/", ComplaintController.submitComplaint);

export default router;
