import { Router } from 'express';
import Product from '../Models/productModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Add a new product
router.post('/add-product', authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: 'Product added successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Fetch all products
router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
