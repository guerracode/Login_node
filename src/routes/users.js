const express = require('express');
const chalk = require('chalk');
const response = require('../utils/response');
const Controller = require('../services/users.js');

function usersApi(app) {
  const router = express.Router();

  app.use('/api/users', router);

  // Get al users:
  router.get('/', (req, res) => {
    Controller.getUsers()
      .then(users => {
        response.success(req, res, users, 'OK', 200);
      })
      .catch(err => {
        response.error(req, res, err, 'ERROR', 500);
      });
  });
  // Get one user with id:
  router.get('/:id', (req, res) => {
    Controller.getUser(req.params.id)
      .then(user => {
        response.success(req, res, user, 'OK', 200);
      })
      .catch(err => {
        response.error(req, res, err, 'ERROR', 500);
      });
  });
  //Create user:
  router.post('/', (req, res) => {
    Controller.createUser(req.body)
      .then(user => {
        response.success(req, res, user, 'User created Correctly!', 200);
      })
      .catch(err => {
        response.error(req, res, err, 'ERROR', 500);
      });
  });
  // router.get('/:id', getUser);
  // router.post('/', createUser);

}

module.exports = usersApi;
