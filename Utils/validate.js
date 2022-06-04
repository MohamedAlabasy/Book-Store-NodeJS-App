const { validationResult } = require('express-validator');

exports.validate = (request) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error()
        error.status = 404;
        error.message = errors.array() /* get array of errors from log(errors) */
            .reduce((current, object) => current + object.msg + "   |   ", "");
        throw error;
    }
}