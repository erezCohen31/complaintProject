import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ComplaintController = {
  submitComplaint: (req, res) => {
    const { category, message } = req.body;

    if (!category || !message) {
      return res.status(400).send("All fields are required.");
    }

    console.log(`Complaint received [${category}]:`, message);

    res.sendFile(path.join(__dirname, "../public/receipt.html"));
  },
};
