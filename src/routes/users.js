const express = require('express');
const chalk = require('chalk');
const response = require('../utils/response');
const Controller = require('../services/users.js');

function usersApi(app) {
  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', (req, res) => {
    Controller.getUsers()
      .then(users => {
        response.success(req, res, users, 'OK', 200);
      })
      .catch(err => {
        response.error(req, res, err, 'ERROR', 500);
      });
  });
  // router.get('/:id', getUser);
  // router.post('/', createUser);

}

module.exports = usersApi;
