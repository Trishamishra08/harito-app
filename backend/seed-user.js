import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

const seedUser = async () => {
  try {
    await connectDB();
    
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (!existingUser) {
      const user = new User({
        name: 'Harito Admin',
        email: adminEmail,
        phone: '1234567890',
        password: adminPassword,
        role: 'admin'
      });
      await user.save();
      console.log(`✅ Admin user ${adminEmail} created successfully! (password: ${adminPassword})`);
    } else {
      // Update existing admin password to what was requested
      existingUser.password = adminPassword;
      await existingUser.save();
      console.log(`ℹ️ Admin user ${adminEmail} updated with new password.`);
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();
