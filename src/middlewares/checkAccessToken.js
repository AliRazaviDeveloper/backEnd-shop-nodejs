const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { userModel } = require("../models/user");
const checkAccessToken = (req, res, next) => {
  const headers = req.headers;
  const [bearerToken, accessToken] = headers.authorization?.split(" ") || [];
  if (accessToken && ["bearer", "Bearer"].includes(bearerToken)) {
    JWT.verify(accessToken, process.env.SECRET_KEY, async (err, payload) => {
      if (err) next(createHttpError.Unauthorized("توکن شما منقظی شده است ."));
      const phone = payload.payload;
      const user = await userModel.findOne({ phone: phone });
      if (!user) next(createHttpError.Unauthorized("توکن شما منقظی شده است ."));
      req.user = user;
      next();
    });
  } else {
    next(createHttpError.Unauthorized("توکن شما صحیح نمی باشد ."));
  }
};

module.exports = checkAccessToken;
