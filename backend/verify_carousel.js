import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Carousel from './src/models/Carousel.js';

dotenv.config();

const checkCarousel = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const count = await Carousel.countDocuments();
    const slides = await Carousel.find().sort({ createdAt: -1 });
    
    console.log(`Total Carousel Slides: ${count}`);
    slides.forEach((slide, index) => {
      console.log(`${index + 1}: ${slide.title} - ${slide.image}`);
    });
    
    process.exit();
  } catch (error) {
    console.error('Error checking carousel:', error);
    process.exit(1);
  }
};

checkCarousel();
