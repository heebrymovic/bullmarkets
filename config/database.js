require('dotenv').config();
const mongoose = require('mongoose');
const db_uri = process.env.DB_URL;
mongoose
    .connect(
        db_uri,
        { useNewUrlParser: true },
        { useUnifiedTopology: true },
        { useCreateIndex: true },
        { useFindAndModify: false }
    )
    .then(() => {
        console.log('Connected to database');
    })
    .catch(error => {
        console.log('Error connecting to database');
        console.log(error);
    });
