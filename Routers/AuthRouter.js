const express = require('express');
const router = express.Router();

const Auth = require('../Models/AuthSchema')
const controller = require('../Controllers/AuthController');
const { query, body, param } = require('express-validator');

// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
], controller.login);


// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
router.post('/register', [
    body('name').isAlpha().withMessage('invalid name'),
    body('email').isEmail().withMessage('invalid email')
        .custom((value) => {
            return Auth.findOne({ email: value })
                .then((data) => {
                    if (data)
                        return Promise.reject('Email already taken')
                })
        }),
    body('password').isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters'),
    body('gender').isIn(['male', 'female']).withMessage("gender must be male or female"),
], controller.register);

// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
router.get('/user', [
    body('id').isInt().withMessage('invalid id'),
], controller.getUserData);

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
router.get('', controller.getAllUsersData);

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
router.delete('', [
    body('id').isInt().withMessage('invalid id'),
], controller.deleteUser);

// #=======================================================================================#
// #			                            lgoOut                                         #
// #=======================================================================================#
router.post('/logout', controller.lgoOut);


module.exports = router;