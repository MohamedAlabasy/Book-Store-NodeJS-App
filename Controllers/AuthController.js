const bcrypt = require('bcryptjs');

const Auth = require('../Models/AuthSchema');
const { validate } = require('../Utils/validate')
// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
exports.login = (request, response, next) => {
    validate(request)
    Auth.findOne({ email: request.body.email }).select('+password')
        .then((data) => {
            if (data == null) {
                throw new Error(`No user with this id = ${request.body.id}`)
            } else {
                let passwordIsValid = bcrypt.compareSync(request.body.password, data.password)
                if (!passwordIsValid) {
                    throw new Error(`invalid password`)
                } else {
                    response.status(200).json({
                        status: 1,
                        data: {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            gender: data.gender,
                        },
                    });
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
    let user = new Auth({
        name: request.body.name,
        email: request.body.email,
        gender: request.body.gender,
        password: hash,
    })
    user.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
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
    Auth.findById(request.body.id).select('-createdAt -updatedAt -__v')
        .then((data) => {
            if (data == null) {
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
    Auth.find({}).select('-createdAt -updatedAt -__v')
        .then(data => {
            if (data == null) {
                throw new Error('No user to show')
            } else {
                response.status(200).json({
                    status: 1,
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
    Auth.findByIdAndDelete(request.body.id)
        .then((data) => {
            if (data == null) {
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
// #			                            lgoOut                                         #
// #=======================================================================================#
exports.lgoOut = (request, response, next) => {
    validate(request)
    response.status(200).json({
        status: 1,
        data: 'lgo out',
    })
}