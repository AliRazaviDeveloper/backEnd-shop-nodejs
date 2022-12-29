class UserController {
  index(req, res, next) {
    try {
      res.status(200).json({
        message: "Hello World",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
