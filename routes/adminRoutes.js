import express from "express";
import { AdminController } from "../controllers/adminController.js";

const router = express.Router();

router.post("/", AdminController.login);

router.get("/panel", AdminController.showPanel);

export default router;
