const {
  Router
} = require('express');
const authorization = require('../../middlewares/extractToken');
const UserController = require('../../controllers/users');
const route = Router()

route.get('/', authorization.required, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    user: user
  });
});

route.put('/', authorization.required, async (req, res) => {
  const user = req.user;
  const userQuery = req.body.user;
  if (!userQuery) {
    return res.status(400).json({
      "status": "400",
      "error": "Bad Request"
    });
  }
  try {
    const updatedUser = await UserController.updateUser(user, userQuery);
    return res.status(200).json({
      user: updatedUser
    })
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = route