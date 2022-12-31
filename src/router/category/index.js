const categoryController = require("../../controllers/admin/category/categoryController");
const checkAccessToken = require("../../middlewares/checkAccessToken");

const categoryRouter = require("express").Router();
categoryRouter.get("/", checkAccessToken, categoryController.getAllCategory);
categoryRouter.get(
  "/:id",
  checkAccessToken,
  categoryController.getCategoryWithId
);
categoryRouter.post("/", checkAccessToken, categoryController.createCategory);
categoryRouter.delete("/", checkAccessToken, categoryController.remove);
categoryRouter.get(
  "/parent",
  checkAccessToken,
  categoryController.getAllParentCategory
);
categoryRouter.get(
  "/parent/child/:id",
  checkAccessToken,
  categoryController.getAllChildParentCategory
);
module.exports = categoryRouter;
