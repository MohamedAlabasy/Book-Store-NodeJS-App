const express = require("express");
const { query, body, param } = require('express-validator');

const Tag = require('../Models/TagSchema');
const controller = require('../Controllers/TagController');

const router = express.Router();

router.route('')
    .post()
    .get()
    .put()
    .delete()
module.exports = router;
