const express = require("express");
const morgan = require("morgan");
module.exports = (app) => {
  app.use(morgan());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    express.static(require("path").join(__dirname, "..", "..", "public"))
  );
};
