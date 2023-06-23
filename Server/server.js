const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/dbConfig.js');
const usersRoute = require('./Routes/usersRoute.js');
const productsRoute = require('./Routes/productsRoute.js');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
