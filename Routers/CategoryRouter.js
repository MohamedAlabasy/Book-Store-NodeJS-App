const express = require('express');
const { query, body, param } = require('express-validator');

const Category = require('../Models/CategorySchema');
const controller = require('../Controllers/CategoryController');

const router = express.Router();

router.get('/all', controller.getAllCategory)
router.route('')
    .post(categoryName(), controller.createCategory)

    .get(categoryID(), controller.getCategoryByID)

    .put([
        body("_id").isInt().withMessage('invalid category ID'),
        body("name").isAlpha().withMessage('invalid category name')
            .custom((categoryName) => {
                Category.findOne({ name: categoryName })
                    .then(categoryName => {
                        if (categoryName) return Promise.reject('category name already exit')
                    })
            })
    ], controller.updateCategory)

    .delete(categoryID(), controller.deleteCategory)


function categoryName() {
    return [
        body("name").isAlpha().withMessage('invalid category name')
            .custom((categoryName) => {
                Category.findOne({ name: categoryName })
                    .then(categoryName => {
                        if (categoryName) return Promise.reject('category name already exit')
                    })
            })
    ]
}


function categoryID() {
    return [
        body("_id").isInt().withMessage('invalid category ID')
    ]
}

module.exports = router;