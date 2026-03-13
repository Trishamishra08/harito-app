import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const addProvid404 = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const provid404 = {
      name: 'PROVID-404',
      category: 'Pesticides',
      subcategory: 'Insecticide',
      brand: 'Hirato',
      description: 'Profenofos 40% + Cypermethrin 4% E.C. Powerful dual-action insecticide for effective broad-spectrum pest control.',
      image: 'provid-404.png',
      status: 'In Catalog'
    };
    
    const existing = await Product.findOne({ name: provid404.name });
    if (!existing) {
      await Product.create(provid404);
      console.log(`Added: ${provid404.name}`);
    } else {
      console.log(`Skipped (already exists): ${provid404.name}`);
    }
    
    console.log('Finished updating data.');
    process.exit();
  } catch (error) {
    console.error('Error adding PROVID-404:', error);
    process.exit(1);
  }
};

addProvid404();
