
const jwt = require('jsonwebtoken');

const checkTokens = (request, response, next) => {
    const authHeader = request.headers["authorization"] || request.body.token || request.query.token;
    const token = authHeader && authHeader.split(' ')[1]; //to get token without Bearer
    if (!token) {
        let error = new Error("You must enter token");
        error.status = 403;
        throw error;
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                let error = new Error('invalid token');
                error.status = 403;
                throw error;
            } else {
                request.user = decoded;
                next();
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = checkTokens;