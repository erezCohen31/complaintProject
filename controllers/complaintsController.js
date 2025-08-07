import Complaint from "../models/complaint.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ComplaintController = {
  submitComplaint: async (req, res) => {
    const { category, message } = req.body;

    if (!category || !message) {
      return res.status(400).send("All fields are required.");
    }

    try {
      const complaint = new Complaint({ category, message });
      await complaint.save();

      console.log("Complaint saved in DB:", complaint);

      res.sendFile(path.join(__dirname, "../public/receipt.html"));
    } catch (error) {
      console.error("Error saving complaint:", error);
      res.status(500).send("Server error, please try again later.");
    }
  },
};
