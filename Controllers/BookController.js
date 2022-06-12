const Book = require('../Models/BookSchema');
const { validate } = require('../Utils/validate');

const unreturnedData = '-createdAt -updatedAt -__v';

// #=======================================================================================#
// #			                              Create                                       #
// #=======================================================================================#
exports.createBook = (request, response, next) => {
    validate(request);
    console.log(request.body);
    let book = new Book({
        title: request.body.title,
        details: request.body.details,
        rate: 0,
        author: +request.body.author,
        category: +request.body.category,
    })
    book.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    title: data.title,
                    details: data.details,
                    rate: data.rate,
                    author: data.author,
                    category: data.category,
                },
            })
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                       get Book by ID                                      #
// #=======================================================================================#
exports.getBookByID = (request, response, next) => {
    validate(request);
    // path: 'categories'
    Book.findById(request.body._id).populate({ path: 'author category', select: unreturnedData }).select(unreturnedData)
        .then(data => {
            if (data === null) {
                throw new Error(`No Book with this id = ${request.body._id}`)
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
// #			                         get All books                                     #
// #=======================================================================================#
exports.getAllBook = (request, response, next) => {
    validate(request)
    Book.find({}).populate({ path: 'author category', select: unreturnedData }).select(unreturnedData)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No Book to show');
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
exports.updateBook = (request, response, next) => {
    validate(request);
    Book.findById(request.body._id).select(unreturnedData)
        .then(bookData => {
            if (bookData === null) throw new Error('Book not found');
            bookData.title = request.body.title;
            bookData.details = request.body.details;
            bookData.rate = request.body.rate;
            bookData.author = request.body.author;
            bookData.category = request.body.category;
            return bookData.save()
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
exports.deleteBook = (request, response, next) => {
    validate(request)
    Book.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Book with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Book deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}