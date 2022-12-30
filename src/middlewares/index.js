const express = require("express");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("../config/swagger");
module.exports = (app) => {
  const spec = swaggerJsdoc(options);
  app.use(morgan());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    express.static(require("path").join(__dirname, "..", "..", "public"))
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
};
