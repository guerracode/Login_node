require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.SECRET || 'PlatziSecret',
  },
  store: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
