// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  voterID: { type: String, required: true }, // Unique college identifier
  candidateIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Election' }], // Array of elections where user is a candidate
  votedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Election' }], // Array of elections where user has voted
  village: { type: String, required: true },
  constituency: { type: String, required: true },
  district: { type: String, required: true },
  img: { type: String, default: '' },
  vote: {
    type: Map,
    of: {
      count: { type: Number, default: 0 }
    },
    default: {}
  },
  bio: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;