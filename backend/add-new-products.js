import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const addProducts = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const newProducts = [
      {
        name: 'RIDER SC',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Fipronil 5% SC. Broad-spectrum insecticide for effective pest control.',
        image: 'rider-sc.png',
        status: 'In Catalog'
      },
      {
        name: 'ROKER 505',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Chlorpyriphos 50% + Cypermethrin 5% EC. Powerful dual-action insecticide.',
        image: 'roker-505.png',
        status: 'In Catalog'
      },
      {
        name: 'EMAVID',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Emamectin Benzoate 5% SG. Specialized insecticide for lepidopteran pests.',
        image: 'emavid.png',
        status: 'In Catalog'
      },
      {
        name: 'PARTNER PLUS',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC. Modern combination insecticide for systemic and contact action.',
        image: 'partner-plus.png',
        status: 'In Catalog'
      },
      {
        name: 'VIDZU',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Pymetrozine 50% WG. Advanced insecticide for sucking pest management.',
        image: 'vidzu.png',
        status: 'In Catalog'
      }
    ];
    
    for (const prodData of newProducts) {
      const existing = await Product.findOne({ name: prodData.name });
      if (!existing) {
        await Product.create(prodData);
        console.log(`Added: ${prodData.name}`);
      } else {
        console.log(`Skipped (already exists): ${prodData.name}`);
      }
    }
    
    console.log('Finished updating products.');
    process.exit();
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
};

addProducts();
