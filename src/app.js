const express = require("express");
class Application {
  #app = express();
  constructor(PORT) {
    this.createConfig();
    this.createServer(PORT);
    this.createRouter();
    this.createErrorHandler();
  }

  createServer(port) {
    this.#app.listen(port, (err) => {
      if (err) throw err;
      console.log(`server start at http://localhost:${port}`);
    });
  }

  createConfig() {
    require("./middlewares")(this.#app);
  }

  createRouter() {
    require("./router")(this.#app);
  }

  createErrorHandler() {
    require("./middlewares/404")(this.#app);
    require("./middlewares/error")(this.#app);
  }
}

module.exports = Application;
