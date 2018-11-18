const {
  Router
} = require('express');
const UserController = require('../../controllers/users');

const route = Router()

/**
 * Route for registering new Users.
 */
route.post('/', async (req, res) => {
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
route.post('/login', async (req, res) => {
  const loginQuery = req.body.user;
  const user = await UserController.findUserByEmail(loginQuery.email);
  if (user == null) {
    return res.status(422).json({
      message: "user does not exist"
    });
  }

  const credential = await user.getCredential();
  if (credential.password !== loginQuery.password) {
    return res.status(422).json({
      message: "email or password is invalid."
    });
  }

  return res.status(200).json({
    user: user
  });

});


module.exports = route