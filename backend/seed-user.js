import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

const seedUser = async () => {
  try {
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'trishamishra@gmail.com' });
    
    if (!existingUser) {
      const user = new User({
        name: 'Trisha Mishra',
        email: 'trishamishra@gmail.com',
        phone: '6260491554',
        password: 'admin',
        role: 'admin'
      });
      await user.save();
      console.log('✅ Admin user trishamishra@gmail.com created successfully!');
    } else {
      console.log('ℹ️ Admin user trishamishra@gmail.com already exists.');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();
