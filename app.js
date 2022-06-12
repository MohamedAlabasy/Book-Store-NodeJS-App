const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userRouter = require('./Routers/AuthRouter');
const controllerRouter = require('./Routers/CategoryRouter');
const tagRouter = require('./Routers/TagRouter');
const authorRouter = require('./Routers/AuthorRouter');
const bookRouter = require('./Routers/BookRouter');
const commentRouter = require('./Routers/CommentRouter');

require('dotenv').config();
const app = express();

// #=======================================================================================#
// #			                        connect mongoose                                   #
// #=======================================================================================#
mongoose.connect(process.env.MONGO_DB)
    .then((data) => {
        console.log('DB connected ...');
        // run server
        app.listen(process.env.PORT || PORT, () => {
            console.log(`App Run at http://${process.env.HOST}:${process.env.PORT || 8888}`);
        });
    }).catch((error) => {
        console.log('DB not connected: ' + error);
    });

app.use(morgan('tiny'));

// #=======================================================================================#
// #			                     add header or use cors                                #
// #=======================================================================================#
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");//alow to any web side to connect to my server
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); //for routs
    response.header("Access-Control-Allow-Header", "Content-Type,Authorization");
    next();
});


// #=======================================================================================#
// #			                            body_parse                                     #
// #=======================================================================================#
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// #=======================================================================================#
// #			                         for add images                                    #
// #=======================================================================================#
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, 'Public/images'))
    },
    filename: (request, file, callback) => {
        callback(null, new Date().toUTCString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
}
// to allowed front end to access my image
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(multer({ storage, fileFilter }).single('image'));

// #=======================================================================================#
// #			                            router                                         #
// #=======================================================================================#
app.use('', userRouter);
app.use('/category', controllerRouter);
app.use('/tag', tagRouter);
app.use('/author', authorRouter);
app.use('/book', bookRouter);
app.use('/comment', commentRouter);
// #=======================================================================================#
// #			                        not Found middleware                               #
// #=======================================================================================#
app.use((request, response, next) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    })
})

// #=======================================================================================#
// #			                      error middleware                                     #
// #=======================================================================================#
app.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error.message + ''
    })
})

