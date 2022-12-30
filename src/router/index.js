const authRouter = require("./auth");
const userRouter = require("./users");

module.exports = (app) => {
  app.use("/api/v1/admin/users", userRouter);
  app.use("/api/v1/auth", authRouter);
};
