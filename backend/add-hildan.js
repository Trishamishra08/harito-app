import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://trisha:trisha123@cluster0.edyhcpm.mongodb.net/haritoDB';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  subcategory: String,
  brand: String,
  description: String,
  image: String,
  status: { type: String, default: 'In Catalog' }
});

const Product = mongoose.model('Product', productSchema);

async function addProduct() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const hildan = {
      name: 'HILDAN-90 FERTILIZER',
      category: 'FERTILIZERS',
      subcategory: 'Sulphur Fertilizer',
      brand: 'HIRATO',
      description: 'HILDAN-90 (Sulphur 90% WDG) is a high-purity sulphur fertilizer that promotes faster nutrient absorption and improves soil health for better crop yield.',
      image: 'hildan-90.png'
    };

    const existing = await Product.findOne({ name: /HILDAN-90/i });
    if (existing) {
      console.log('Product already exists, updating...');
      await Product.updateOne({ _id: existing._id }, hildan);
    } else {
      await Product.create(hildan);
      console.log('Product added successfully');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

addProduct();
