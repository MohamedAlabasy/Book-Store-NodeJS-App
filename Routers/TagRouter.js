const express = require("express");
const { body, check } = require('express-validator');

const Tag = require('../Models/TagSchema');
const controller = require('../Controllers/TagController');

const router = express.Router();

router.route('')
    .post(tagData(), controller.createTag)
    .get(tagID(), controller.getTagByID)
    .put(tagID(), tagData(), controller.updateTag)
    .delete(tagID(), controller.deleteTag)


function tagData() {
    return [
        body("tag").isAlpha().withMessage('invalid tag name'),
        check('tag').custom(tagName => {
            return Tag.findOne({ tag: tagName })
                .then(tagData => {
                    if (tagData) {
                        return Promise.reject('tag name already exit');
                    }
                });
        }),
    ]
}

function tagID() {
    return [
        body("_id").isInt().withMessage('invalid category ID')
    ]
}

module.exports = router;
