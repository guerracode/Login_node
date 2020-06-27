// const nanoid = require('nanoid');
const auth = require('../routes/auth');
const store = require('../lib/pg.js');

const TABLE = 'users';

async function getUsers() {
  return users = await store.getUsers(TABLE);
}

module.exports = {
  getUsers,
}
