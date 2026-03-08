import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    
    // Check if category already exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category name already exists' });
    }
    
    const newCategory = new Category({ name, description, image });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      { name, description, image },
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
