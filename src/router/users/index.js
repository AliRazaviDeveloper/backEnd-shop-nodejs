const userController = require("../../controllers/admin/user/userController");

const userRouter = require("express").Router();

userRouter.get("/", userController.index);

module.exports = userRouter;
