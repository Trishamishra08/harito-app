import Product from '../models/Product.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { 
      name, category, subcategory, brand, description, image,
      packSizes, formulation, suitableCrops, usage, benefits, safety 
    } = req.body;
    
    const newProduct = new Product({ 
      name, category, subcategory, brand, description, image,
      packSizes, formulation, suitableCrops, usage, benefits, safety 
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, category, subcategory, brand, description, image,
      packSizes, formulation, suitableCrops, usage, benefits, safety 
    } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      { 
        name, category, subcategory, brand, description, image,
        packSizes, formulation, suitableCrops, usage, benefits, safety 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
