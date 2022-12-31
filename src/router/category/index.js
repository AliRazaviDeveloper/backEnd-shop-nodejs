const categoryController = require("../../controllers/admin/category/categoryController");
const checkAccessToken = require("../../middlewares/checkAccessToken");

const categoryRouter = require("express").Router();
categoryRouter.get("/", checkAccessToken, categoryController.getAllCategory);

categoryRouter.post("/", checkAccessToken, categoryController.createCategory);
categoryRouter.delete("/", checkAccessToken, categoryController.remove);
categoryRouter.get(
  "/parent",
  checkAccessToken,
  categoryController.getAllParentCategory
);
categoryRouter.patch("/", checkAccessToken, categoryController.update);
categoryRouter.get(
  "/parent/child/:id",
  checkAccessToken,
  categoryController.getAllChildParentCategory
);
categoryRouter.get(
  "/:id",
  checkAccessToken,
  categoryController.getCategoryWithId
);
module.exports = categoryRouter;
