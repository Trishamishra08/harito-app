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
    const { title, subtitle, description, image } = req.body;
    const newSlide = new Carousel({ title, subtitle, description, image });
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
    const { title, subtitle, description, image } = req.body;
    
    const updatedSlide = await Carousel.findByIdAndUpdate(
      id, 
      { title, subtitle, description, image },
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
          title: 'SMART AGRICULTURE',
          subtitle: 'NURTURING NATURE WITH PRECISION SCIENCE',
          description: 'ISO 9001:2015 Certified manufacturer providing high-yield solutions for the modern farmer.',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
        },
        {
          title: 'ISO 9001:2015 CERTIFIED',
          subtitle: 'QUALITY YOU CAN TRUST',
          description: 'High-grade chemical fertilizers and pesticides manufactured with international safety standards.',
          image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80'
        },
        {
          title: 'BAREILLY PRECISION',
          subtitle: 'EFFICIENT SUPPLY CHAIN SOLUTIONS',
          description: 'Safe storage and nationwide distribution of agricultural chemicals from our Uttar Pradesh facility.',
          image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80'
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
