import { Router } from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// new user registration

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (user) {
      //   return res.send({
      //     success: false,
      //     message: 'User already exists',
      //   });
      throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// User Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (!user) {
      throw new Error('User does not exists! Register first');
    }

    // check password
    const validPaswword = await bcrypt.compare(
      req.body.password, // Plain Password
      user.password // Encrypted Password or Hashed Password
    );

    if (!validPaswword) {
      throw new Error('Password does not match');
    }

    // create token and assign it

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});

    // Response
    res.send({
      success: true,
      message: 'User Logged in Successfully',
      token: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
