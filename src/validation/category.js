const Joi = require("joi");
const { PATTERN_MONGO_ID } = require("../config/constant");

const categorySchema = Joi.object({
  title: Joi.string()
    .required()
    .min(2)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمی باشد .")),
  label: Joi.string()
    .required()
    .min(2)
    .max(30)
    .error(new Error("برچسب دسته بندی صحیح نمی باشد .")),
  parent: Joi.string()
    .pattern(PATTERN_MONGO_ID)
    .error(new Error("ایدی دسته بندی صحیح نمی باشد .")),
});

module.exports = categorySchema;
