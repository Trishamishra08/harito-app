import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

const seedUser = async () => {
  try {
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ phone: '6260491554' });
    
    if (!existingUser) {
      const user = new User({
        name: 'Harito Admin',
        email: 'admin@harito.com',
        phone: '6260491554',
        role: 'admin'
      });
      await user.save();
      console.log('✅ Admin user 6260491554 created successfully!');
    } else {
      console.log('ℹ️ Admin user 6260491554 already exists.');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();
