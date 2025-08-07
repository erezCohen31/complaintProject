import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.redirect("/admin/panel");
  } else {
    res.status(403).send("Incorrect password");
  }
});

router.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin-panel.html"));
});

export default router;
