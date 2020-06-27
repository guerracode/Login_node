const { Pool } = require('pg');

const connection = new Pool({
  user: 'platzi',
  host: 'localhost',
  database: 'backendos',
  password: 'platzi',
});

function getUsers(table) {
  return new Promise((resolve, reject) => {
    connection
      .query(`SELECT * FROM ${table}`)
      .then(res => {
        console.log(res.rows);
        resolve(res.rows);
      })
      .catch(e => reject(e.stack));
    connection.end();
  });
}

// console.log(getUsers());
module.exports = {
  getUsers,
};
