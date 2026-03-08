import Carousel from '../models/Carousel.js';

// Get all carousel slides
export const getCarouselSlides = async (req, res) => {
  try {
    const slides = await Carousel.find().sort({ createdAt: -1 });
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel slides', error: error.message });
  }
};

// Create a new carousel slide
export const createCarouselSlide = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newSlide = new Carousel({ title, description, image });
    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    res.status(400).json({ message: 'Error creating carousel slide', error: error.message });
  }
};

// Update a carousel slide
export const updateCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    
    const updatedSlide = await Carousel.findByIdAndUpdate(
      id, 
      { title, description, image },
      { new: true, runValidators: true }
    );
    
    if (!updatedSlide) {
      return res.status(404).json({ message: 'Carousel slide not found' });
    }
    
    res.status(200).json(updatedSlide);
  } catch (error) {
    res.status(400).json({ message: 'Error updating carousel slide', error: error.message });
  }
};

// Delete a carousel slide
export const deleteCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Carousel.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Carousel slide not found' });
    }
    
    res.status(200).json({ message: 'Carousel slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting carousel slide', error: error.message });
  }
};

// Seed default carousel slides if collection is empty
export const seedCarousel = async (req, res) => {
  try {
    const count = await Carousel.countDocuments();
    if (count === 0) {
      const defaults = [
        {
          title: 'ADVANCED CROP PROTECTION',
          description: 'Shield your harvest with our premium range of insecticides and pesticides engineered for maximum effectiveness.',
          image: 'https://images.unsplash.com/photo-1632923057890-4e3a3db1a3e0?w=1920&q=80'
        },
        {
          title: 'PRECISION PEST MANAGEMENT',
          description: 'Targeted solutions for modern agriculture — protect your crops with science-backed formulations.',
          image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1920&q=80'
        },
        {
          title: 'HEALTHY FIELDS, HIGHER YIELDS',
          description: 'Empowering farmers with eco-friendly fertilizers and cutting-edge seed technology for a greener tomorrow.',
          image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80'
        }
      ];
      await Carousel.insertMany(defaults);
      const slides = await Carousel.find().sort({ createdAt: -1 });
      return res.status(201).json({ message: 'Default slides seeded', slides });
    }
    res.status(200).json({ message: 'Carousel already has data' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding carousel', error: error.message });
  }
};
