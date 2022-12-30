const httpError = require("http-errors");
module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || httpError.InternalServerError().status;
    const message = error.message || httpError.InternalServerError().message;

    res.status(status).json({
      data: null,
      error: {
        message,
        status,
        success: false,
      },
    });
  });
};
