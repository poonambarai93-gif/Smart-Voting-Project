// models/Election.js
import mongoose from 'mongoose';

// models/Election.js
const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  village: { type: String}, 
  constituency
: { type: String},
  district: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  eligibility: {
    village: { type: String},
    constituency
: { type: String},
    district: { type: String, required: true },
  },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });


const Election = mongoose.model('Election', electionSchema);
export default Election;