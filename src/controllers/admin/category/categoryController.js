const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { categoryModel } = require("../../../models/category");
const categorySchema = require("../../../validation/category");
const Controller = require("../../controllers");
class CategoryController extends Controller {
  async createCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, label, parent, children } = req.body;
      const category = await categoryModel.create({
        title,
        label,
        parent,
        children,
      });
      if (!category)
        throw createHttpError.InternalServerError(
          "مشکل در ثبت  دیتا دسته بندی به وجود آمده است . "
        );
      res.status(201).json({
        status: "success",
        data: {
          message: "دسته بندی شما با موفقیت افزوده شد .",
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const result = await categoryModel.aggregate([
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "children",
            maxDepth: 10,
            depthField: "depth",
            as: "children",
          },
        },
        {
          $match: {
            children: {
              $ne: [],
            },
          },
        },
      ]);

      if (!result)
        throw createHttpError.InternalServerError(
          "مشکلی در گرفتن دیتا از سمت سرور رخ داده است ."
        );
      res.status(200).json({
        status: "success",
        data: {
          result: result,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllParentCategory(req, res, next) {
    try {
      const result = await categoryModel.find({ parent: true });
      if (!result)
        throw createHttpError.InternalServerError(
          "مشکل در دریافت دسته بندی از سمت سرور رخ داده است ."
        );
      res.status(200).json({
        status: "success",
        data: {
          result: result,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllChildParentCategory(req, res, next) {
    try {
      const { id } = req.params;
      const result = await categoryModel.find(
        { children: id },
        { title: 1, label: 1, _id: 1 }
      );
      if (!result)
        createHttpError.InternalServerError(
          "مشکل در عملیات گرفتن دیتا از سمت سرور رخ داده است ."
        );
      res.status(200).json({
        status: "success",
        data: {
          result: result,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.body;
      const category = await categoryModel.findById(id);
      if (!category)
        throw createHttpError.NotFound("دسته بندی با این ایدی یافت نشد .");
      const deleteResult = await categoryModel.deleteMany({
        $or: [{ _id: id }, { children: id }],
      });
      if (deleteResult.deletedCount === 0)
        throw createHttpError.InternalServerError(
          "مشکل در عملیات حذف دسته بندی به وجود آمده است ."
        );
      res.status(200).json({
        status: "success",
        data: {
          message: "دسته بندی شما با موفقیت حذف شد .",
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryWithId(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryModel.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "category",
            localField: "children",
            foreignField: "_id",
            as: "children",
          },
        },
        {
          $limit: 1,
        },
      ]);
      if (!category)
        throw createHttpError.NotFound(
          "دسته بندی با ایدی مدنظر شما یافت نشد ."
        );
      res.status(200).json({
        status: 200,
        data: {
          result: category,
        },
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
