const jwt = require("jsonwebtoken");


const authenticate = (request, response, next) => {
    const token = request.headers.authorization;

    if (token) {
        const decoded = jwt.verify(token, "auth");
        if (decoded) {
            const userID = decoded.userID;
            request.body.userID = userID;
            next();
        } else {
            response.send("Please Login First!");
        }
    } else {
        response.send("Please Login First!");
    }
}


module.exports = { authenticate };