const express = require('express');
const chalk = require('chalk');
const response = require('../utils/response');

function usersApi(app) {
   const router = express.Router();

   app.use('/api/users', router);

   router.get('/', (req, res) => {
      console.log(chalk.blue('Esto es Azul'));
      console.log(chalk.red('Esto es Azul'));
      console.log(chalk.green('Esto es Azul'));
      response.success(req, res, "Todo Bien");
   });
}; 

module.exports = usersApi;