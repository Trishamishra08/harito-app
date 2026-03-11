import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';

async function checkProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('--- PRODUCTS ---');
    products.forEach(p => {
      console.log(JSON.stringify({
        id: p._id,
        name: p.name,
        image: p.image,
        category: p.category
      }, null, 2));
    });
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkProducts();
