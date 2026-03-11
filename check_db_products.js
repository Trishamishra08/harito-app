import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'backend/.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';

async function checkProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // We don't have the model here so we query raw collection
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('Total Products in DB:', products.length);
    products.forEach(p => {
      console.log(`- ${p.name}: image=${p.image}`);
    });
    
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkProducts();
