import express from "express";
import { AdminController } from "../controllers/adminController.js";

const router = express.Router();

router.post("/", AdminController.login);
router.get("/panel", AdminController.showPanel);
router.get("/complaints", AdminController.getComplaints);

export default router;
