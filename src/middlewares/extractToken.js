const UserController = require('../controllers/users');

function validateToken (token){
    if (!token || token.search(/Token\s(.)+/g) === -1) {
        return false;
    }
    return true;
}

const authorization = {
    required: async (req, res, next) => {
        let token = req.header('Authorization');
        let valid = validateToken(token);
        if (!valid) {
            return res.status(401).json('HTTP ACCESS DENIED');
        }
        token = token.split(" ")[1];
        let user = await UserController.findUserByToken(token);
        if (!user) {
            return res.status(401).send("HTTP Access Denied");
        }

        req.user = user;
        next();
    },
    optional: async (req, res, next) => {
        let token = req.header('Authorization');
        let valid = validateToken(token);
        let user;
        if (valid) {
            token = token.split(" ")[1];
            user = await UserController.findUserByToken(token);
        }
        req.user = user;
        next();
    }
}

module.exports = authorization;