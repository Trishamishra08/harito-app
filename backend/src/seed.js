import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const initialCategories = [
  { name: 'Pesticides', description: 'Protect your crops from pests.', image: '/category_pesticides.jpg' },
  { name: 'Fertilizers', description: 'Enhance crop growth and yield.', image: '/category_fertilizers.jpg' },
  { name: 'Seeds', description: 'High quality seeds for better harvest.', image: '/category_seeds.jpg' },
  { name: 'Agricultural Equipment', description: 'Modern farming machinery.', image: '/category_equipment.jpg' },
];

const initialProducts = [
  { name: 'GLYVID-71\nHerbicide', category: 'Pesticides', subcategory: 'Herbicide', brand: 'Harito', description: 'Ammonium Salt of Glyphosate 71% SG. Effective weed control.', image: '/glyvid-71.png' },
  { name: 'VITO-M45\nFungicide', category: 'Pesticides', subcategory: 'Fungicide', brand: 'Harito', description: 'Mancozeb 75% WP. Protection against fungal diseases.', image: '/vito-m45.png' },
  { name: 'RIDER PLUS\nInsecticide', category: 'Pesticides', subcategory: 'Insecticide', brand: 'Harito', description: 'Fipronil 0.6 W/W GR. Advanced protection for crops.', image: '/rider-plus.png' },
  { name: 'HIRA-70\nFungicide', category: 'Pesticides', subcategory: 'Fungicide', brand: 'Harito', description: 'Thiophanate Methyl 70% W.P. Trusted plant health.', image: '/hira-70.png' },
  { name: 'RIZO\nBio Fertilizer', category: 'Fertilizers', subcategory: 'Bio Fertilizer', brand: 'Harito', description: 'Vesicular Arbuscular Mycorrhizal Bio Fertilizer. Keeps roots stronger.', image: '/rizo.png' },
  { name: 'HILDAN-90\nFertilizer', category: 'Fertilizers', subcategory: 'Fertilizer', brand: 'Harito', description: 'Sulphur 90% WDG. Essential sulphur nutrition for crops.', image: '/hildan-90.png' },
  { name: 'GLYVID\nSG Herbicide', category: 'Pesticides', subcategory: 'Herbicide', brand: 'Harito', description: 'Next-gen SG formulation for superior weed management.', image: '/glyvid-new.png' }
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
