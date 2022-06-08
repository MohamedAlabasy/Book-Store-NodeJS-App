const Author = require('../Models/AuthorSchema');
const { validate } = require('../Utils/validate');

const unreturnedData = '-createdAt -updatedAt -__v';

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
exports.createAuthor = (request, response, next) => {
    validate(request);
    let author = new Author({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        image: request.file.filename,
        gender: request.body.gender,
    })
    author.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    image: data.image,
                    gender: data.gender,
                },
            })
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get Author by ID                                    #
// #=======================================================================================#
exports.getAuthorByID = (request, response, next) => {
    validate(request);
    Author.findById(request.body._id).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Author with this id = ${request.body._id}`)
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
// #			                            update                                         #
// #=======================================================================================#
exports.updateAuthor = (request, response, next) => {
    validate(request);
    Author.findById(request.body._id).select(unreturnedData)
        .then(authorData => {
            if (authorData === null) throw new Error('Author not found');
            authorData.name = request.body.name
            return authorData.save()
        }).then(saveData => {
            response.status(200).json({
                status: 1,
                data: saveData,
            })
        })
        .catch(error => {
            next(error)
        })

}
// #=======================================================================================#
// #			                            delete                                         #
// #=======================================================================================#
exports.deleteAuthor = (request, response, next) => {
    validate(request)
    Author.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Author with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Author deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}