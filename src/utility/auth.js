const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const redisClient = require("../../database/redis");
const { userModel } = require("../models/user");

const generateToken = (
  payload,
  tokenType = process.env.SECRET_KEY,
  option = {
    expiresIn: "2h",
  }
) => {
  return JWT.sign({ payload }, tokenType, option);
};
const generateRefreshToken = async (
  payload,
  tokenType = process.env.SECRET_KEY,
  option = {
    expiresIn: "1y",
  }
) => {
  const token = JWT.sign({ payload }, tokenType, option);
  await redisClient.SETEX(payload, 365 * 24 * 60 * 60, token);

  return token;
};
const refreshToken = (token) => {
  return JWT.verify(token, process.env.SECRET_KEY, async (error, payload) => {
    if (error) throw createHttpError.Unauthorized(" توکن شما معتبر نیست .");
    const phone = payload?.payload || [];
    const user = await userModel.findOne({ phone: phone });
    if (!user)
      throw createHttpError.Unauthorized("برای توکن شما مشکلی پیش آمده است .");
    const refreshToken = await redisClient.get(user.phone);
    if (refreshToken !== token)
      throw createHttpError.Unauthorized(
        "ورود مجدد به حساب کاربری انجام نشد ."
      );
    return phone;
  });
};
module.exports = {
  generateToken,
  refreshToken,
  generateRefreshToken,
};
