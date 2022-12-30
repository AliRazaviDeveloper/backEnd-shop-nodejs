const httpError = require("http-errors");
module.exports = (app) => {
  app.use((req, res, next) => {
    next(httpError.NotFound("ادرس مدنظر یافت نشد ."));
  });
};
