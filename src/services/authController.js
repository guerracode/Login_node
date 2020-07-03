const bcrypt = require('bcrypt');
const authToken = require('../lib/authToken');
const store = require('../lib/db.js');

const TABLE = 'auth';

async function upsertAuth(data, creteUpdate) {
  const authData = {
    id: data.id,
  };

  if (data.username) {
    authData.username = data.username;
  }

  if (data.password) {
    authData.password = await bcrypt.hash(data.password, 5);
  }

  return store.upsertAuth(TABLE, authData, creteUpdate);
}

async function login(username, password) {
  const data = await store.loginQuery(TABLE, username);
  console.log('data Login:: ', data);

  return bcrypt.compare(password, data.password).then(areEqual => {
    if (areEqual === true) {
      console.log('Are Equal!!');
      return authToken.sign({ ...data });
    } else {
      throw new Error('Invalid Information');
    }
  });
}

module.exports = {
  upsertAuth,
  login,
};
