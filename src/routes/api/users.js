const {
  Router
} = require('express');
const UserController = require('../../controllers/users');
const {
  validateNewUser,
  validateLogin
} = require('../../middlewares/validateUser');

const {
  validate
} = require('../../util/credentialProcessing');

const route = Router()

/**
 * Route for registering new Users.
 */
route.post('/', validateNewUser, async (req, res) => {
  const user = req.body.user;
  const email = user.email;
  const username = user.username;
  const password = user.password;
  try {
    let newUser = await UserController.createUser(username, email, password);
    return res.status(201).json({
      user: newUser
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message
    })
  }
})
/**
 * Route for logging in an User.
 */
route.post('/login', validateLogin, async (req, res) => {
  const loginQuery = req.body.user;
  const user = await UserController.findUserByEmail(loginQuery.email);
  if (user == null) {
    return res.status(422).json({
      error: {
        'email or password': ["is invalid."]
      }
    });
  }

  const credential = await user.getCredential();
  const validatePassword = await validate(loginQuery.password, credential.password)
  if (!validatePassword) {
    return res.status(422).json({
      error: {
        'email or password': ["is invalid."]
      }
    });
  }

  return res.status(200).json({
    user: user
  });

});


module.exports = route