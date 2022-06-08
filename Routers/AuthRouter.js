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
    body('first_name').isAlpha().withMessage('invalid first name'),
    body('last_name').isAlpha().withMessage('invalid last name'),
    body('email').isEmail().withMessage('invalid email')
        .custom((userEmail) => {
            return User.findOne({ email: userEmail })
                .then((data) => {
                    if (data)
                        return Promise.reject('Email already exit')
                })
        }),
    body('password').isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters'),
    body('birth_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('invalid birth date you must enter it in form of YYYY-MM-DD'),
    body('country').isAlpha().withMessage('invalid country'),
    body('mobile_phone').custom((phoneNumber) => {
        let reg = /^01[0125][0-9]{8}$/;
        return reg.test(phoneNumber);
    }).withMessage('invalid mobile phone'),
    body('gender').isIn(['male', 'female']).withMessage("gender must be male or female"),
], controller.register);

// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
router.get('/user', checkTokens, [
    body('_id').isInt().withMessage('invalid id'),
], controller.getUserData);

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
router.get('/users', checkTokens, controller.getAllUsersData);

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
router.delete('', checkTokens, [
    body('_id').isInt().withMessage('invalid id'),
], controller.deleteUser);

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
router.post('/logout', [
    body('_id').isInt().withMessage('invalid id'),
], checkTokens, controller.logout);
// #=======================================================================================#
// #			                        exports router                                     #
// #=======================================================================================#
module.exports = router;