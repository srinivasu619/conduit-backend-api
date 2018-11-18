const {
  Router
} = require('express');
const authorization = require('../../middlewares/extractToken');

const route = Router()

route.get('/', authorization.required, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    user: user
  });
});

route.put('/', authorization.required, (req, res) => {
});

module.exports = route