import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin',
  },
  otp: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;
