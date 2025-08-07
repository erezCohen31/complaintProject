import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { message, category } = req.body;
  console.log(`Complaint received [${category}]:`, message);
  res.send("Complaint received, thank you!");
});

export default router;
