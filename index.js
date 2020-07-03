const express = require('express');
const { port } = require('./src/config/config');
const usersApi = require('./src/routes/usersNetwork');
const authApi = require('./src/routes/authNetwork');

const app = express();

app.use(express.json());
app.use('/api-docs', express.static('public'));

usersApi(app);
authApi(app);

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}`);
});
