import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const updateProvidSuper = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const provid = await Product.findOne({ name: /PROVID SUPER/i });
    if (provid) {
      provid.packSizes = ['100 ml', '250 ml', '500 ml', '1 Liter'];
      provid.formulation = 'Liquid Formulation';
      await provid.save();
      console.log('Updated Provid Super with new packing sizes.');
    } else {
      console.log('Provid Super not found in DB.');
    }
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateProvidSuper();
