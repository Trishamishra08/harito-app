import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const initialCategories = [
  { name: 'Pesticides', description: 'Protect your crops from pests.', image: '/images/category_pesticides.jpg' },
  { name: 'Fertilizers', description: 'Enhance crop growth and yield.', image: '/images/category_fertilizers.jpg' },
  { name: 'Seeds', description: 'High quality seeds for better harvest.', image: '/images/category_seeds.jpg' },
  { name: 'Agricultural Equipment', description: 'Modern farming machinery.', image: '/images/category_equipment.jpg' },
];

const initialProducts = [
  { name: 'GLYVID-71\nHerbicide', category: 'Pesticides', subcategory: 'Herbicide', brand: 'Hirato', description: 'Ammonium Salt of Glyphosate 71% SG. Effective weed control.', image: '/images/glyvid-71.png' },
  { name: 'VITO-M45\nFungicide', category: 'Pesticides', subcategory: 'Fungicide', brand: 'Hirato', description: 'Mancozeb 75% WP. Protection against fungal diseases.', image: '/images/vito-m45.png' },
  { name: 'RIDER PLUS\nInsecticide', category: 'Pesticides', subcategory: 'Insecticide', brand: 'Hirato', description: 'Fipronil 0.6 W/W GR. Advanced protection for crops.', image: '/images/rider-plus.png' },
  { name: 'HIRA-70\nFungicide', category: 'Pesticides', subcategory: 'Fungicide', brand: 'Hirato', description: 'Thiophanate Methyl 70% W.P. Trusted plant health.', image: '/images/hira-70.png' },
  { name: 'RIZO\nBio Fertilizer', category: 'Fertilizers', subcategory: 'Bio Fertilizer', brand: 'Hirato', description: 'Vesicular Arbuscular Mycorrhizal Bio Fertilizer. Keeps roots stronger.', image: '/images/rizo.png' },
  { name: 'HILDAN-90\nFertilizer', category: 'Fertilizers', subcategory: 'Fertilizer', brand: 'Hirato', description: 'Sulphur 90% WDG. Essential sulphur nutrition for crops.', image: '/images/hildan-90.png' },
  { name: 'GLYVID\nSG Herbicide', category: 'Pesticides', subcategory: 'Herbicide', brand: 'Hirato', description: 'Next-gen SG formulation for superior weed management.', image: '/images/glyvid-new.png' }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    
    // Insert initial data
    await Category.insertMany(initialCategories);
    await Product.insertMany(initialProducts);
    
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
