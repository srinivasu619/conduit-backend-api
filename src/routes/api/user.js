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

route.put('/', authorization.required, async (req, res) => {
  const user = req.user;
  const userQuery = req.body.user;
  if(!userQuery) {
    return res.status(400).json({
			"status": "400",
			"error": "Bad Request"
		});
  }
  try {
    if(userQuery.email && userQuery.email != null){
      user.email = userQuery.email
    }
    if(userQuery.bio && userQuery.body != null){
      user.bio = userQuery.bio;
    }
    if(userQuery.username && userQuery.username != null){
      user.username = userQuery.username;
    }
    if(userQuery.image && userQuery.image != null){
      user.image = userQuery.image;
    }
    if(userQuery.password && userQuery.password != null){
      const credential =  await user.getCredential();
      credential.password = userQuery.password;
      await credential.save();
    }
    const updatedUser = await user.save();
    return res.status(200).json({
      user: updatedUser
    })
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = route