const express = require('express');
const chalk = require('chalk');
const response = require('../utils/response');
const Controller = require('../services/authController');

function authApi(app) {
  const router = express.Router();

  app.use('/api/login', router);

  router.post('/', function (req, res) {
    Controller.login(req.body.username, req.body.password)
      .then(token => {
        console.log(token);
        response.success(req, res, token, 'Welocome!!!');
      })
      .catch(err => {
        response.error(req, res, err, 'Login Error');
      });
  });
}

module.exports = authApi;
