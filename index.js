const express = require("express");
const { port } = require("./src/config/index");
const usersApi = require("./src/routes/users");

const app = express();

app.use(express.json());

usersApi(app);

app.listen(port, () => {
   console.log(`Server running in: http://localhost:${port}`);
});
