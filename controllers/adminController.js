import path from "path";
import { fileURLToPath } from "url";
import Complaint from "../models/complaint.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AdminController = {
  login: (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
      res.redirect("/admin/panel");
    } else {
      res.status(403).send("Incorrect password");
    }
  },

  showPanel: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin-panel.html"));
  },
  getComplaints: async (req, res) => {
    try {
      const complaints = await Complaint.find().sort({ createdAt: -1 });
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
