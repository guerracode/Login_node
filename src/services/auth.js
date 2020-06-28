const bcrypt = require('bcrypt');
const auth = require('../lib/auth');
const store = require('../lib/pg.js');

const TABLE = 'auth';

async function createAuth(data) {
  const authData = {
    id: data.id,
  };

  if (data.username) {
    authData.username = data.username;
  }

  if (data.password) {
    authData.password = await bcrypt.hash(data.password, 5);
  }

  return store.createAuth(TABLE, authData);
}

async function login(username, password) {
  const data = await store.loginQuery(TABLE, username);
  console.log('data Login:: ', data);

  return bcrypt.compare(password, data.password).then(areEqual => {
    if (areEqual === true) {
      // Generar token;
      console.log("Are Equal!!");
      return auth.sign({ ...data });
    } else {
      throw new Error('Informacion invalida');
    }
  });
}

module.exports = {
  createAuth,
  login,
};
