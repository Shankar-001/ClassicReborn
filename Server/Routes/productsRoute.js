const { Router } = require('express');
const Product = require('../Models/productModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const cloudinary = require('../Config/cloudinaryConfig.js');
const multer = require('multer');

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
    const products = await Product.find(); // .sort({ createdAt: -1 }) for sorted with date
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

// edit the product
router.put('/edit-product/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: 'Product Updated Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete a Product
router.delete('/delete-product/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Product Deleted Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get image from Computer to cloudinary
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// Upload Image to Cloudinary
router.post(
  '/upload-image-to-product',
  authMiddleware,
  multer({ storage: storage }).single('file'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'SellOrSwirl',
      });
      console.log(result);
      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
      res.send({
        success: true,
        message: 'Image Uploaded Successfully',
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
