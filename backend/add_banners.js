import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Carousel from './src/models/Carousel.js';

dotenv.config();

const addBanners = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/harito';
    await mongoose.connect(MONGO_URI);
    
    const banners = [
      {
        title: 'ECO-FRIENDLY CROP CARE',
        description: 'Protecting your fields with sustainable and effective pest management solutions.',
        image: 'http://localhost:5000/uploads/image-1772878546268-410584881.jfif'
      },
      {
        title: 'FROM FARM TO TABLE',
        description: 'Fresh, organic, and locally grown produce delivered straight to your home.',
        image: 'http://localhost:5000/uploads/image-1772876532903-621916982.jfif'
      }
    ];
    
    await Carousel.insertMany(banners);
    console.log('Successfully added 2 new banners');
    
    process.exit();
  } catch (error) {
    console.error('Error adding banners:', error);
    process.exit(1);
  }
};

addBanners();
