import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String, // Storing as string to match current frontend implementation
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: 'Harito'
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['In Catalog', 'Out of Stock', 'Discontinued'],
    default: 'In Catalog'
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
