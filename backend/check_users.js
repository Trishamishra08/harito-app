import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
await mongoose.connect(MONGO_URI);
const users = await User.find();
console.log(JSON.stringify(users));
process.exit();
