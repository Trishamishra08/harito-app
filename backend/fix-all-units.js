import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const fixAllUnits = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    // Dry Keywords (Wettable Powder, Water Granules, Granules, Soluble Powder, etc.)
    const dryKeywords = ['WP', 'WG', 'GR', 'SP', 'SG', 'DUST', 'POWDER', 'GRANULE', 'W/W', 'W.P.'];
    // Liquid Keywords (Emulsifiable Concentrate, Suspension Concentrate, Soluble Liquid, etc.)
    const liquidKeywords = ['EC', 'SC', 'SL', 'EW', 'LIQUID', 'SOLUTION', 'V/V', 'E.C.'];

    const products = await Product.find();
    let updatedCount = 0;

    for (const prod of products) {
      const text = `${prod.name} ${prod.description}`.toUpperCase();
      
      let isDry = false;
      let isLiquid = false;

      // check for explicit keywords
      dryKeywords.forEach(k => { if (text.includes(k)) isDry = true; });
      liquidKeywords.forEach(k => { if (text.includes(k)) isLiquid = true; });

      // If both or neither, check subcategory/category
      if (prod.subcategory?.toUpperCase().includes('GRANULE') || prod.name.toUpperCase().includes('BIO FERTILIZER')) {
        isDry = true;
      }

      const currentSizes = prod.packSizes || [];
      const hasLiters = currentSizes.some(s => s.toLowerCase().includes('liter') || s.toLowerCase().includes('ml'));
      const hasKgs = currentSizes.some(s => s.toLowerCase().includes('kg') || s.toLowerCase().includes('g') && !s.toLowerCase().includes('kg'));
      
      // Specifically fix the ones the user pointed out if they are wrong
      if (isDry && !hasKgs) {
        prod.packSizes = ['100 g', '250 g', '500 g', '1 kg'];
        prod.formulation = 'Powder / Granule Formulation';
        await prod.save();
        console.log(`Updated ${prod.name} to Dry Units (KG/G)`);
        updatedCount++;
      } else if (isLiquid && !hasLiters) {
        prod.packSizes = ['100 ml', '250 ml', '500 ml', '1 Liter'];
        prod.formulation = 'Liquid Formulation';
        await prod.save();
        console.log(`Updated ${prod.name} to Liquid Units (L/ML)`);
        updatedCount++;
      }
    }
    
    // Explicitly fix the ones from the screenshots just in case
    const targetNames = ['VITO-M45', 'HIRA-70', 'RIDER PLUS'];
    for (const name of targetNames) {
        const p = await Product.findOne({ name: new RegExp(name, 'i') });
        if (p) {
            p.packSizes = ['100 g', '250 g', '500 g', '1 kg'];
            p.formulation = 'Powder / Granule Formulation';
            await p.save();
            console.log(`Force updated ${p.name} to KG/G`);
        }
    }

    console.log(`Total products updated: ${updatedCount}`);
    process.exit();
  } catch (error) {
    console.error('Error fixing units:', error);
    process.exit(1);
  }
};

fixAllUnits();
