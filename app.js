const express = require('express');
require('./config/connection'); // connection of database
require('dotenv').config()
const indexRouters = require('./routes/indexRouts');
const port = process.env.PORT || 3000;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouters);

// server is running on ...
app.listen(port, () => {
    console.log(`server is running on ${port} ...`);
});