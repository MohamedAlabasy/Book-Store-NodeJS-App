const express = require('express');
const { body, check } = require('express-validator');

const Book = require('../Models/BookSchema');
const User = require('../Models/UserSchema');
const controller = require('../Controllers/CommentController');

const router = express.Router();

router.route('')
    .get(bookID(), controller.getAllComment)
    .post(dataName(), bookID(), controller.createComment)
    .put(commentID(),
        [
            body('comment').isAlpha().withMessage('invalid comment').isLength({ min: 15 }).withMessage('must be at least 15 chars long'),
        ], controller.updateComment)
    .delete(commentID(), controller.deleteComment)


function dataName() {
    return [
        body('comment').isAlpha().withMessage('invalid comment').isLength({ min: 15 }).withMessage('must be at least 15 chars long'),
        check('user').isInt().withMessage('invalid user ID')
            .custom(userID => {
                return User.findById(userID)
                    .then(userData => {
                        if (!userData) {
                            return Promise.reject('user ID Not Found');
                        }
                    });
            }),
    ]
}


function bookID() {
    return [
        check('book').isInt().withMessage('invalid book ID')
            .custom(bookID => {
                return Book.findById(bookID)
                    .then(bookData => {
                        if (!bookData) {
                            return Promise.reject('book ID Not Found');
                        }
                    });
            }),
    ]
}

function commentID() {
    return [
        body("_id").isInt().withMessage('invalid Comment ID')
    ]
}

module.exports = router;