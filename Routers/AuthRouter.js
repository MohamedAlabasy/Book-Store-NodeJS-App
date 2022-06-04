const express = require('express');
const { query, body, param } = require('express-validator');

const User = require('../Models/UserSchema')
const controller = require('../Controllers/AuthController');
const checkTokens = require('../Middleware/checkTokens');

const router = express.Router();

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
            return User.findOne({ email: value })
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
router.get('/user', checkTokens, [
    body('id').isInt().withMessage('invalid id'),
], controller.getUserData);

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
router.get('/users', checkTokens, controller.getAllUsersData);

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
router.delete('', checkTokens, [
    body('id').isInt().withMessage('invalid id'),
], controller.deleteUser);

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
router.post('/logout', checkTokens, controller.logout);

// #=======================================================================================#
// #			                        exports router                                     #
// #=======================================================================================#
module.exports = router;