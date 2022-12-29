module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: "404 not found",
      success: false,
    });
  });
};
