const express = require('express');
const { body } = require('express-validator');

const controller = require('../Controllers/AuthorController');

const router = express.Router();

router.route('')
    .post(authorData(), controller.createAuthor)
    .get(authorID(), controller.getAuthorByID)
    .put(authorID(), authorData(), controller.updateAuthor)
    .delete(authorID(), controller.deleteAuthor)




function authorData() {
    return [
        body('first_name').isAlpha().withMessage('invalid first_name'),
        body('last_name').isAlpha().withMessage('invalid last_name'),
        body('gender').isIn(['male', 'female']).withMessage("gender must be male or female"),
    ]
}
function authorID() {
    return [
        body("_id").isInt().withMessage('invalid category ID')
    ]
}

module.exports = router;