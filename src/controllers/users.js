const {
  User
} = require('../db');
const uuidv4 = require('uuid/v4');
const {
  encrypt
} = require('../util/credentialProcessing')

async function findUserByEmail(email) {
  const user = await User.findOne({
    where: {
      email: email
    }
  });
  return user;
}

async function findUserByUsername(username) {
  const user = await User.findOne({
    where: {
      username: username
    }
  });
  return user;
};

async function findUserByToken(token) {
  const user = await User.findOne({
    where: {
      token: token
    }
  });
  return user;
}

async function createUser(username, email, password) {

  let newUser = await User.create({
    email: email,
    username: username,
    token: uuidv4()
  });
  password = await encrypt(password);
  await newUser.createCredential({
    password: password
  })
  return newUser;
}

async function updateUser(user, userQuery) {
  if (userQuery.email && userQuery.email != null) {
    user.email = userQuery.email
  }
  if (userQuery.bio && userQuery.bio != null) {
    user.bio = userQuery.bio;
  }
  if (userQuery.username && userQuery.username != null) {
    user.username = userQuery.username;
  }
  if (userQuery.image && userQuery.image != null) {
    user.image = userQuery.image;
  }
  if (userQuery.password && userQuery.password != null) {
    const credential = await user.getCredential();
    credential.password = await encrypt(userQuery.password);
    await credential.save();
  }
  const updatedUser = await user.save();
  return updatedUser;
}

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserByToken,
  createUser,
  updateUser
}