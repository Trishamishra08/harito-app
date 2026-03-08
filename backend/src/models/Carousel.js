import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Carousel = mongoose.model('Carousel', carouselSchema);

export default Carousel;
