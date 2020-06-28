const { Pool } = require('pg');

const pool = new Pool({
  user: 'platzi',
  host: 'localhost',
  database: 'backendos',
  password: 'platzi',
});

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

function createUser(table, user) {
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

function createAuth(table, user) {
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

//TODO check this function, is not working:
function update(table, user) {
  return new Promise((resolve, reject) => {
    pool.connect().then(client => {
      return client
        .query(`UPDATE ${table} SET ${user} WHERE id=${user.id}`)
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
  createUser,
  createAuth,
  loginQuery,
};
