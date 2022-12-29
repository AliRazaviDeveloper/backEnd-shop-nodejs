module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "internal server error";

    res.status(status).json({
      message,
      status,
      success: false,
    });
  });
};
