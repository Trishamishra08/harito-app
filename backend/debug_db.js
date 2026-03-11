import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';

async function checkProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('\n--- PRODUCTS IN DB ---');
    console.log('Count:', products.length);
    products.forEach(p => {
      console.dir(p);
    });
    
    const categories = await mongoose.connection.db.collection('categories').find({}).toArray();
    console.log('\n--- CATEGORIES IN DB ---');
    console.log('Count:', categories.length);
    categories.forEach(c => {
      console.log(`ID: ${c._id} | Name: ${c.name} | Image: ${c.image}`);
    });
    
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkProducts();
