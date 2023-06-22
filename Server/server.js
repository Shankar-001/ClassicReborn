import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/dbConfig.js';
import usersRoute from './Routes/usersRoute.js';
import productsRoute from './Routes/productsRoute.js'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
