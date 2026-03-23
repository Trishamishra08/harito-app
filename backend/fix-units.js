import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const fixUnits = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    // 1. Fix RIZO Bio Fertilizer specifically
    await Product.updateOne(
      { name: /RIZO/i },
      { 
        packSizes: ['100 g', '250 g', '500 g', '1 kg'],
        formulation: 'Powder / Granule Formulation'
      }
    );
    console.log('Fixed RIZO Bio Fertilizer units.');

    // 2. Fix other fertilizers/packets
    const dryProducts = await Product.find({ 
      $or: [
        { name: /Bio Fertilizer/i },
        { category: /Fertilizers/i },
        { subcategory: /Granule/i }
      ]
    });

    for (const prod of dryProducts) {
      if (!prod.packSizes.some(s => s.toLowerCase().includes('g'))) {
        prod.packSizes = ['100 g', '250 g', '500 g', '1 kg'];
        prod.formulation = 'Granule Formulation';
        await prod.save();
        console.log(`Updated ${prod.name} to weight-based units.`);
      }
    }
    
    console.log('Finished unit cleanup.');
    process.exit();
  } catch (error) {
    console.error('Error fixing units:', error);
    process.exit(1);
  }
};

fixUnits();
