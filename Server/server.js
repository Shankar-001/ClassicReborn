const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const dbConfig = require('./Config/dbConfig.js');
const usersRoute = require('./Routes/usersRoute.js');
const productsRoute = require('./Routes/productsRoute.js');
const bidsRoute = require('./Routes/bidsRoute.js');
const notificationsRoute = require('./Routes/notificationsRoute.js');

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
