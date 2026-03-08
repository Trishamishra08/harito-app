import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js';

dotenv.config();

const checkDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log(`Categories: ${categoryCount}`);
    console.log(`Products: ${productCount}`);
    
    if (categoryCount > 0) {
      const sample = await Category.find().limit(5);
      console.log('Sample Categories:', sample.map(c => c.name));
    }
    
    process.exit();
  } catch (error) {
    console.error('Error checking database:', error);
    process.exit(1);
  }
};

checkDB();
