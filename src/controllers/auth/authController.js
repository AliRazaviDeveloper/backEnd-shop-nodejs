const createHttpError = require("http-errors");
const { getRandomNumber } = require("../../utility/general");
const { otpSchema, checkOtpSchema } = require("../../validation/auth");
const Controller = require("../controllers");
const { userModel } = require("../../models/user");
const {
  generateToken,
  refreshToken,
  generateRefreshToken,
} = require("../../utility/auth");
class AuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await otpSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = getRandomNumber(100000, 999999);
      const result = await this.saveUser(phone, code);
      if (!result)
        throw new Error(
          createHttpError.Unauthorized(
            "مشکل در عملیات ورود شما به سایت لطفا مجددا تلاش فرمایید ."
          )
        );

      res.status(201).json({
        data: {
          status: 201,
          message: "کد با موفقیت به شماره موبایل شما ارسال گردیده شد .",
          code,
          phone,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(phone, code) {
    let otp = {
      code,
      expired_at: new Date().getTime() + 120000,
    };
    const result = await this.findPhoneNumber(phone);
    if (result) {
      return await this.updateUser(phone, otp);
    }
    return !!(await userModel.create({
      phone,
      otp,
    }));
  }

  async findPhoneNumber(phone) {
    const result = await userModel.findOne({ phone: phone });
    return !!result;
  }
  async updateUser(phone, otp) {
    const result = await userModel.updateOne(
      { phone },
      {
        $set: {
          otp,
        },
      }
    );

    return !!result.matchedCount;
  }

  async checkOtp(req, res, next) {
    try {
      let now = new Date().getTime();
      await checkOtpSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const user = await userModel.findOne({ phone });
      if (!user)
        throw createHttpError.NotFound(
          "این شماره موبایل در سیستم ثبت نشده است ."
        );
      if (user.otp.code !== code)
        throw createHttpError.Unauthorized("کد وارد شده صحیح نمی باشد ");
      if (user.otp.expired_at < now)
        throw createHttpError.Unauthorized("کد ارسالی منقضی شده است . ");

      const accessToken = generateToken(phone);
      const refreshToken = await generateRefreshToken(
        phone,
        process.env.SECRET_KEY,
        {
          expiresIn: "1y",
        }
      );

      console.log(refreshToken);

      res.status(200).json({
        data: {
          message: "شما با موفقیت وارد اکانت کاربری خود شدید .",
          token: accessToken,
          refreshToken,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async generateNewRefreshToken(req, res, next) {
    try {
      const { tokenRefresh } = req.body;
      const phone = await refreshToken(tokenRefresh);
      const user = await userModel.findOne({ phone: phone });
      if (!user) throw createHttpError.NotFound("کاربر یافت نشد .");
      const accessToken = generateToken(phone);
      const newRefreshToken = await generateRefreshToken(
        phone,
        process.env.SECRET_KEY,
        {
          expiresIn: "1y",
        }
      );
      res.status(200).json({
        data: {
          refreshToken: newRefreshToken,
          accessToken,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
