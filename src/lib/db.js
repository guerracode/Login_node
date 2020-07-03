const { Pool } = require('pg');
const chalk = require('chalk');
const config = require('../config/config');

const pool = new Pool({
  user: config.store.user,
  host: config.store.host,
  database: config.store.database,
  password: config.store.password,
  port: config.store.port,
});
// const pool = new Pool({
//   user: 'platzi',
//   host: 'localhost',
//   database: 'backendos',
//   password: 'platzi',
// });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

function getUsers(table) {
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(`SELECT * FROM ${table}`)
        .then(res => {
          console.log(res.rows);
          client.release();
          resolve(res.rows);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}
function getUser(table, id) {
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(`SELECT * FROM ${table} WHERE id=\'${id}\'`)
        .then(res => {
          client.release();
          resolve(res.rows);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

function upsert(table, data, creteUpdate) {
  if (!creteUpdate) {
    return updateUser(table, data);
  } else {
    return createUser(table, data);
  }
}

function createUser(table, user) {
  console.log(chalk.red('Creating User'));
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(
          `INSERT INTO ${table}(username, name, email, id) VALUES (\'${user.username}\',\'${user.name}\', \'${user.email}\', \'${user.id}\')`
        )
        .then(() => {
          resolve(user);
          client.release();
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

//TODO check this function, is not working:
function updateUser(table, user) {
  console.log(chalk.red('Updating User'));
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(
          `UPDATE ${table} SET name=\'${user.name}\', email=\'${user.email}\', username=\'${user.username}\' WHERE id=\'${user.id}\'`
        )
        .then(() => {
          client.release();
          resolve(user);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

function upsertAuth(table, data, creteUpdate) {
  if (!creteUpdate) {
    return updateAuth(table, data);
  } else {
    return createAuth(table, data);
  }
}

function createAuth(table, user) {
  console.log(chalk.red('Creating Auth'));
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(
          `INSERT INTO ${table}(id, username, password) VALUES (\'${user.id}\',\'${user.username}\',\'${user.password}\')`
        )
        .then(() => {
          client.release();
          resolve(user);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

function updateAuth(table, user) {
  console.log(chalk.red('Updating Auth', user.password));
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(
          `UPDATE ${table} SET username=\'${user.username}\', password=\'${user.password}\' WHERE id=\'${user.id}\'`
        )
        .then(() => {
          client.release();
          resolve(user);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

function loginQuery(table, username) {
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(`SELECT * FROM ${table} WHERE username = \'${username}\'`)
        .then(res => {
          client.release();
          resolve(res.rows[0]);
        })
        .catch(err => {
          client.release();
          reject(err);
          console.log(err.stack);
        });
    });
    // connection.end();
  });
}

module.exports = {
  getUsers,
  getUser,
  upsert,
  upsertAuth,
  createUser,
  createAuth,
  updateAuth,
  loginQuery,
  updateUser,
};
