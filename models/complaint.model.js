import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Food', 'Equipment', 'Orders', 'Other'],  
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
