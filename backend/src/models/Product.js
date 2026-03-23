import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: 'Hirato'
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
  },
  packSizes: {
    type: [String],
    default: ['1 Liter', '500 ml', '250 ml', '100 ml']
  },
  formulation: {
    type: String,
    default: 'Liquid'
  },
  suitableCrops: {
    type: String,
    default: 'Wheat, Rice, Sugarcane, Vegetables, Fruits, and Pulses'
  },
  usage: {
    type: [String],
    default: [
      "Mix the recommended dose in sufficient water as per crop requirement.",
      "Apply through foliar spray or fertigation during early morning or late evening.",
      "Ensure uniform coverage on the foliage for best results."
    ]
  },
  benefits: {
    type: [String],
    default: [
      "Enhances root development and nutrient uptake efficiency",
      "Improves crop resilience against environmental stress",
      "Optimizes flowering and fruiting for higher productivity"
    ]
  },
  safety: {
    type: String,
    default: "Keep out of reach of children. Store in a cool, dry place."
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
