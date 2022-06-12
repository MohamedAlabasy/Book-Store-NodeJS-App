const Comment = require('../Models/CommentSchema');
const { validate } = require('../Utils/validate');

const unreturnedData = '-createdAt -updatedAt -__v'

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
exports.createComment = (request, response, next) => {
    validate(request);
    let comment = new Comment({
        comment: request.body.comment,
        book: request.body.book,
        user: request.body.user,
    })
    comment.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    comment: request.body.comment,
                    book: request.body.book,
                    user: request.body.user,
                },
            })
        })
        .catch((error) => {
            next(error);
        })
}
// #=======================================================================================#
// #			                         get All Categories                                #
// #=======================================================================================#
exports.getAllComment = (request, response, next) => {
    validate(request)
    Comment.find({ book: request.body.book }).populate({ path: 'user', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No Comment to show')
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
exports.updateComment = (request, response, next) => {
    validate(request);
    Comment.findById(request.body._id).populate({ path: 'user', select: unreturnedData }).select(`${unreturnedData} -book`)
        .then(commentData => {
            if (commentData === null) throw new Error('Comment not found');
            commentData.comment = request.body.comment
            return commentData.save()
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
exports.deleteComment = (request, response, next) => {
    validate(request)
    Comment.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Comment with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'Comment deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}