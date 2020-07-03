require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.SECRET || 'PlatziSecret',
  },
};
