const Tag = require('../Models/TagSchema');
const { validate } = require('../Utils/validate');

const unreturnedData = '-createdAt -updatedAt -__v';

// #=======================================================================================#
// #			                                Create                                     #
// #=======================================================================================#
exports.createTag = (request, response, next) => {
    validate(request);
    let tag = new Tag({
        tag: request.body.tag
    })

    tag.save()
        .then((data) => {
            response.status(200).json({
                status: 1,
                data: {
                    _id: data._id,
                    tag: data.tag
                },
            })
        })
        .catch((error) => {
            next(error);
        })

}
// #=======================================================================================#
// #			                        get Tag by ID                                      #
// #=======================================================================================#
exports.getTagByID = (request, response, next) => {
    validate(request);
    Tag.findById(request.body._id).select(unreturnedData)
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
// #			                            update                                         #
// #=======================================================================================#
exports.updateTag = (request, response, next) => {
    validate(request);
    Tag.findById(request.body._id).select(unreturnedData)
        .then(tagData => {
            if (tagData === null) throw new Error('Category not found');
            tagData.tag = request.body.tag
            return tagData.save()
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
exports.deleteTag = (request, response, next) => {
    validate(request);
    Tag.findByIdAndDelete(request.body._id)
        .then((data) => {
            if (data == null) {
                throw new Error(`No Category with this id = ${request.body._id}`)
            } else {
                response.status(200).json({
                    status: 1,
                    message: 'tag deleted successfully',
                });
            }
        })
        .catch((error) => {
            next(error);
        })
}