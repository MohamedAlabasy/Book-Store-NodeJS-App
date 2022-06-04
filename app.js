const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const router = require('./Routers/AuthRouter');

require('dotenv').config();
const PORT = process.env.PORT || 8888;
const app = express();


mongoose.connect('mongodb://localhost:27017/boot_store')
    .then((data) => {
        console.log('DB connected ... ');
        // run server
        app.listen(process.env.PORT || PORT, () => {
            console.log(`App Run at http://${process.env.HOST}:${PORT}`);
        });
    }).catch((error) => {
        console.log('DB not connected', error + '');
    });

//to add header or use cors
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");//alow to any web side to connect to my server
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); //for routs
    response.header("Access-Control-Allow-Header", "Content-Type,Authorization");
    next();
});

// morgan in dev mode
app.use(morgan('tiny'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use('', router);

// middleware not Found
app.use((request, response, next) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    })
})

// middleware error
app.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error + ''
    })
})
