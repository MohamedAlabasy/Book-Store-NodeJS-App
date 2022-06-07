const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/UserSchema');
const { validate } = require('../Utils/validate')
// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
exports.login = (request, response, next) => {
    validate(request)
    User.findOne({ email: request.body.email }).select('+password +token')
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this email = ${request.body.email}`)
            } else {
                let passwordIsValid = bcrypt.compareSync(request.body.password, data.password)
                if (!passwordIsValid) {
                    throw new Error(`invalid password`)
                } else {
                    // to add token to router
                    const accessToken = jwt.sign({ id: data._id, email: data.email }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: 86400 //for 24 hour
                    });
                    // add token to db
                    User.findOneAndUpdate({ token: accessToken }).then(() => {
                        response.status(200).json({
                            status: 1,
                            data: {
                                id: data._id,
                                token: data.token,
                                name: data.name,
                                email: data.email,
                                gender: data.gender,
                            },
                        });
                    }).catch(error => {
                        next(error);
                    })
                }
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
exports.register = (request, response, next) => {
    validate(request)
    let hash = bcrypt.hashSync(request.body.password, 10);
    let user = new User({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: hash,
        birth_date: request.body.birth_date,
        profile_image: request.body.profile_image,
        country: request.body.country,
        mobile_phone: request.body.mobile_phone,
        gender: request.body.gender,
    })
    user.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    id: data._id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    birth_date: data.birth_date,
                    profile_image: data.profile_image,
                    country: data.country,
                    mobile_phone: data.mobile_phone,
                    gender: data.gender,
                },
            })
        })
        .catch((error) => {
            next(error)
        })
}
// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
exports.getUserData = (request, response, next) => {
    validate(request)
    User.findById(request.body.id).select('-createdAt -updatedAt -__v')
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this id = ${request.body.id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    data: data,
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                         get All Users                                     #
// #=======================================================================================#
exports.getAllUsersData = (request, response, next) => {
    validate(request)
    User.find({}).select('-createdAt -updatedAt -__v')
        .then(data => {
            if (data === null) {
                throw new Error('No user to show')
            } else {
                if (data.length === 0) data = 'No users to show'
                response.status(200).json({
                    status: 1,
                    count: data.length,
                    data: data,
                });
            }
        }).catch(error => {
            next(error);
        })
}

// #=======================================================================================#
// #			                          delete User                                      #
// #=======================================================================================#
exports.deleteUser = (request, response, next) => {
    validate(request)
    User.findByIdAndDelete(request.body.id)
        .then((data) => {
            if (data === null) {
                throw new Error(`No user with this id = ${request.body.id}`)
            } else {
                data.deleteUser
                response.status(200).json({
                    status: 1,
                    message: 'deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}

// #=======================================================================================#
// #			                            logout                                         #
// #=======================================================================================#
exports.logout = (request, response, next) => {
    validate(request)
    User.findOneAndUpdate({ token: null }).then(() => {
        response.status(200).json({
            status: 1,
            data: 'logout successful',
        })
    }).catch(error => {
        next(error);
    })
}