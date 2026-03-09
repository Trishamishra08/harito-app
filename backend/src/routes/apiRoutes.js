import express from 'express';
import { getApiStatus } from '../controllers/apiController.js';
import * as categoryController from '../controllers/categoryController.js';
import * as productController from '../controllers/productController.js';
import * as carouselController from '../controllers/carouselController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Base status route
router.get('/status', getApiStatus);

/**
 * Category Routes
 */
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

/**
 * Product Routes
 */
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

/**
 * Carousel/Banner Routes
 */
router.get('/carousel', carouselController.getCarouselSlides);
router.post('/carousel', carouselController.createCarouselSlide);
router.put('/carousel/:id', carouselController.updateCarouselSlide);
router.delete('/carousel/:id', carouselController.deleteCarouselSlide);
router.post('/carousel/seed', carouselController.seedCarousel);

/**
 * Auth Routes
 */
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/send-otp', authController.sendOtp);
router.post('/auth/verify-otp', authController.verifyOtp);

export default router;
