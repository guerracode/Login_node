const nanoid = require('nanoid').nanoid;
const auth = require('../services/authController');
const store = require('../lib/db.js');

const TABLE = 'users';

async function getUsers() {
  return await store.getUsers(TABLE);
}

async function getUser(id) {
  return await store.getUser(TABLE, id);
}

async function upsertUser(body, creteUpdate) {
  const user = {
    username: body.username,
    name: body.name,
    email: body.email,
  };

  if (body.id) {
    user.id = body.id;
  } else {
    user.id = nanoid();
  }
  // console.log(`User Controller:: ${user.id}`)

  if (body.password || body.username) {
    await auth.upsertAuth(
      {
        id: user.id,
        username: user.username,
        password: body.password,
      },
      creteUpdate
    );
  }

  return await store.upsert(TABLE, user, creteUpdate);
}

module.exports = {
  getUsers,
  getUser,
  upsertUser,
};
