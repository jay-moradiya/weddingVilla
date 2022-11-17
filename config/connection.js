const mongoose = require('mongoose');
mongoose.Promise = global.Promise
require('dotenv').config()

const db = process.env.DB_CONNECTION
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected MONGODB !!');
    }).catch((err) => {
        console.log(err);
    });