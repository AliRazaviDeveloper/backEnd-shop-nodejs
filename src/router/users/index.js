const userController = require("../../controllers/admin/user/userController");
const checkAccessToken = require("../../middlewares/checkAccessToken");

const userRouter = require("express").Router();

userRouter.get("/", checkAccessToken, userController.index);

module.exports = userRouter;
