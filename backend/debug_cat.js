import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';

async function checkCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    const categories = await mongoose.connection.db.collection('categories').find({}).toArray();
    console.log('--- CATEGORIES ---');
    categories.forEach(c => {
      console.log(JSON.stringify({
        id: c._id,
        name: c.name,
        image: c.image
      }, null, 2));
    });
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkCategories();
