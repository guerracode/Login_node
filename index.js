const express = require("express");
const { port } = require("./src/config/config");
const usersApi = require("./src/routes/users");
const authApi = require("./src/routes/auth");

const app = express();

app.use(express.json());

usersApi(app);
authApi(app);

app.listen(port, () => {
   console.log(`Server running in: http://localhost:${port}`);
});
