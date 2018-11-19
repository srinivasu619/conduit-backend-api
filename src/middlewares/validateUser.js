var validator = require('validator');
function validateEmail(email){
    let errors = []
    if(!email || email == null || email.length == 0){
        errors.push(`can't be empty`);
        return errors;
    }
    if(!validator.isEmail(email)){
        errors.push(`invalid e-mail`);
    }

    return errors;
}

function validateUsername(username){
    let errors = []
    if(!username || username == null || username.length == 0){
        errors.push(`can't be empty`);
        return errors;
    }
}

function validatePassword(password){
    let errors = []
    if(!password || password == null || password.length == 0){
        errors.push(`must be minimum of 8 Characters`);
        return errors;
    }
}

function validateNewUser(req, res, next) {
    if (!req.body.user) {
        return res.status(422).json({
            "status": "422",
            "error": {
                email: ['cannot be empty'],
                username: ['cannot be empty'],
                password: ['cannot be empty'],
            }
        });
    }
    const error = {}
    const emailErrors = validateEmail(req.body.user.email);
    const usernameErrors = validateUsername(req.body.user.username);
    const passwordErrors = validatePassword(req.body.user.password);
    if(emailErrors.length !=0 ){
        error['email'] = emailErrors;
    }

    if(usernameErrors.length !=0 ){
        error['username'] = usernameErrors;
    }

    if(passwordErrors.length !=0 ){
        error['password'] = passwordErrors;
    }
    if(error !== {}){
        return res.status(422).json({
            error: error
        })
    }
    next();
}

function validateLogin(req,res,next) {
    if (!req.body.user) {
        return res.status(422).json({
            "status": "422",
            "error": {
                email: ['cannot be empty'],
                password: ['cannot be empty'],
            }
        });
    }
    const error = {}
    const emailErrors = validateEmail(req.body.user.email);
    const passwordErrors = validatePassword(req.body.user.password);
    if(emailErrors.length !=0 ){
        error['email'] = emailErrors;
    }

    if(passwordErrors.length !=0 ){
        error['password'] = passwordErrors;
    }
    if(error !== {}){
        return res.status(422).json({
            error: error
        })
    }
    next();
}

module.exports = {
    validateNewUser,
    validateLogin
}