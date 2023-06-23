const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo DB connected successfully');
  } catch (error) {
    console.log(`Mongo Db connection failed ${error}`);
  }
};

module.exports = connectDB;
