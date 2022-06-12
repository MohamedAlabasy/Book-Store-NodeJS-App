const express = require('express');
const { body, check } = require('express-validator');

const Book = require('../Models/BookSchema');
const Author = require('../Models/AuthorSchema');
const Category = require('../Models/CategorySchema');
const controller = require('../Controllers/BookController');

const router = express.Router();

router.get('/all', controller.getAllBook)
router.route('')
    .post(bookData(), controller.createBook)
    .get(bookID(), controller.getBookByID)
    .put(bookID(), bookData(), controller.updateBook)
    .delete(bookID(), controller.deleteBook)


function bookData() {
    return [
        body("title").isAlpha().withMessage('invalid Book title'),
        check('title').custom(bookTitle => {
            return Book.findOne({ title: bookTitle })
                .then(titleData => {
                    if (titleData) {
                        return Promise.reject('Book title already exit');
                    }
                });
        }),
        body('details').isAlpha().withMessage('invalid details').isLength({ min: 15 }).withMessage('must be at least 15 chars long'),

        body('author').isInt().withMessage('invalid author'),
        check('author').custom(authorID => {
            return Author.findById(authorID)
                .then(authorData => {
                    if (!authorData) {
                        return Promise.reject('Author ID Not Found');
                    }
                });
        }),
        body('category').isInt().withMessage('invalid category'),
        check('category').custom(categoryID => {
            return Category.findById(categoryID)
                .then(categoryData => {
                    if (!categoryData) {
                        return Promise.reject('category ID Not Found');
                    }
                });
        }),
        body('category').isInt().withMessage('invalid category')
    ]
}
function bookID() {
    return [
        body("_id").isInt().withMessage('invalid Book ID')
    ]
}

module.exports = router;