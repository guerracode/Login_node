const nanoid = require('nanoid').nanoid;
const auth = require('../services/auth');
const store = require('../lib/pg.js');

const TABLE = 'users';

async function getUsers() {
  return await store.getUsers(TABLE);
}
async function getUser(id) {
  return await store.getUser(TABLE, id);
}
async function createUser(body) {
  const user = {
    username: body.username,
    name: body.name,
    email: body.email,
  };

  user.id = nanoid();
  // console.log(`User Controller:: ${user.id}`)

  if (body.password || body.username) {
    await auth.createAuth({
      id: user.id,
      username: user.username,
      password: body.password,
    });
  }
  return await store.createUser(TABLE, user);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
};
