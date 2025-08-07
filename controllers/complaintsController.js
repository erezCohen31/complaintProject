export const ComplaintController = {
  submitComplaint: (req, res) => {
    const { category, message } = req.body;

    if (!category || !message) {
      return res.status(400).send("All fields are required.");
    }

    console.log(`Complaint received [${category}]:`, message);

    res.send("Complaint received, thank you!");
  },
};
