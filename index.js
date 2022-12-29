const startConnectionDatabase = require("./database");
const Application = require("./src/app");
require("dotenv").config();
startConnectionDatabase();
new Application(process.env.APP_PORT);
