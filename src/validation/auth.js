const Joi = require("joi");

const otpSchema = Joi.object({
  phone: Joi.string()
    .max(11)
    .pattern(/^09[0-9]{9}/)
    .required()
    .error(new Error("شماره موبایل صحیح وارد نشده است . ")),
});

const checkOtpSchema = Joi.object({
  phone: Joi.string()
    .max(11)
    .pattern(/^09[0-9]{9}/)
    .required()
    .error(new Error("شماره موبایل صحیح وارد نشده است . ")),
  code: Joi.string()
    .max(6)
    .required()
    .error(new Error("کد باید ۶ رقم باشد . ")),
});
module.exports = {
  otpSchema,
  checkOtpSchema,
};
