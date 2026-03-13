import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const addRudra = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const rudra = {
      name: 'RUDRA',
      category: 'Pesticides',
      subcategory: 'Insecticide',
      brand: 'Hirato',
      description: 'Emamectin Benzoate 1.9% EC. Effective insecticide for controlling bollworms and other lepidopteran pests.',
      image: 'rudra.png',
      status: 'In Catalog'
    };
    
    const existing = await Product.findOne({ name: rudra.name });
    if (!existing) {
      await Product.create(rudra);
      console.log(`Added: ${rudra.name}`);
    } else {
      console.log(`Skipped (already exists): ${rudra.name}`);
    }
    
    console.log('Finished updating data.');
    process.exit();
  } catch (error) {
    console.error('Error adding RUDRA:', error);
    process.exit(1);
  }
};

addRudra();
