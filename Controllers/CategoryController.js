const { body } = require('express-validator');
const { findById } = require('../Models/CategorySchema');
const Category = require('../Models/CategorySchema');
const { validate } = require('../Utils/validate');

const unreturnedData = "-createdAt -updatedAt -__v";

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
exports.createCategory = (request, response, next) => {
    validate(request);
    let category = new Category({
        name: request.body.name
    })
    category.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    name: data.name
                },
            })
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get Category by ID                                  #
// #=======================================================================================#
exports.getCategoryByID = (request, response, next) => {
    validate(request);
    Category.findById(request.body._id).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Category with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    data: data
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                         get All Category                                  #
// #=======================================================================================#
exports.getAllCategory = (request, response, next) => {
    validate(request)
    Category.find({}).select(unreturnedData)
        .then((data) => {
            if (data === null) {
                throw new Error(`No Category with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    count: data.length,
                    data: data
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                            update                                         #
// #=======================================================================================#
exports.updateCategory = (request, response, next) => {
    validate(request);
    Category.findByIdAndUpdate(request.body._id, {
        $set: {
            name: request.body.name,
        }
    })
        .then(data => {
            response.status(200).json({
                status: 1,
                data: data,
            })
        })
        .catch(error => {
            next(error)
        })

}
// #=======================================================================================#
// #			                            delete                                         #
// #=======================================================================================#
exports.deleteCategory = (request, response, next) => {
    validate(request)
    Category.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Category with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Category deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}