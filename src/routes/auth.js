const express = require('express');
const chalk = require('chalk');
const response = require('../utils/response');
const Controller = require('../services/auth');

function authApi(app) {
  const router = express.Router();

  app.use('/api/login', router);

  router.post('/', function (req, res) {
    Controller.login(req.body.username, req.body.password)
      .then(token => {
        console.log(token);
        response.success(req, res, token, 'Welocome to Backendos!!',);
      })
      .catch(err => {
        response.error(req, res, err, 'Error at Login');
      });
  });
}

module.exports = authApi;
