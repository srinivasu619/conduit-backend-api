const {
  User
} = require('../db');
const uuidv4 = require('uuid/v4');

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
  await newUser.createCredential({
    password: password
  })
  return newUser;
}

async function updateUser(userId, email, bio, image) {

}

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserByToken,
  createUser,
  updateUser
}