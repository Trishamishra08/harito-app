import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const addMoreProducts = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const newProducts = [
      {
        name: 'FINISER',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Chlorantraniliprole 18.5% SC. Next-generation insecticide for superior control of chewing pests.',
        image: 'finiser.png',
        status: 'In Catalog'
      },
      {
        name: 'THINEX PLUS',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Thiamethoxam 30% FS. Seed treatment specialist for early-stage crop protection.',
        image: 'thinex-plus.png',
        status: 'In Catalog'
      },
      {
        name: 'TAVOR PLUS',
        category: 'Pesticides',
        subcategory: 'Herbicide',
        brand: 'Hirato',
        description: 'Pretilachlor 37% EW. Effective herbicide for weed management in paddy fields.',
        image: 'tavor-plus.png',
        status: 'In Catalog'
      },
      {
        name: 'HIRATE BU',
        category: 'Pesticides',
        subcategory: 'Fungicide',
        brand: 'Hirato',
        description: 'Tebuconazole 10% + Sulphur 65% WG. Dual-action fungicide and micronutrient provider.',
        image: 'hirate-bu.png',
        status: 'In Catalog'
      },
      {
        name: 'PROVID SUPER',
        category: 'Pesticides',
        subcategory: 'Insecticide',
        brand: 'Hirato',
        description: 'Profenofos 50% EC. Powerful organophosphate insecticide for tough pests.',
        image: 'provid-super.png',
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
    
    console.log('Finished adding more products.');
    process.exit();
  } catch (error) {
    console.error('Error adding more products:', error);
    process.exit(1);
  }
};

addMoreProducts();
