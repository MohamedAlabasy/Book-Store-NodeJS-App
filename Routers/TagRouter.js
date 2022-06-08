const express = require("express");
const { query, body, param } = require('express-validator');

const Tag = require('../Models/TagSchema');
const controller = require('../Controllers/TagController');

const router = express.Router();

router.route('')
    .post(
        [
            body("tag").isAlpha().withMessage('invalid tag name')
            // .custom((tagName) => {
            //     Tag.findOne({ tag: tagName })
            //         .then(data => {
            //             if (data) return Promise.reject('tag name already exit')
            //         })
            // })
        ], controller.createTag)

    .get(checkID(), controller.getTagByID)

    .put(
        [
            body("_id").isInt().withMessage('invalid Tag ID'),
            body("tag").isAlpha().withMessage('invalid Tag name')
            // .custom((tagName) => {
            //     Tag.findOne({ tag: tagName })
            //         .then(tagName => {
            //             if (tagName) return Promise.reject('tag name already exit');
            //         })
            // })
        ], controller.updateTag)

    .delete(checkID(), controller.deleteTag)


function checkID() {
    return [
        body("_id").isInt().withMessage('invalid category ID')
    ]
}

module.exports = router;
