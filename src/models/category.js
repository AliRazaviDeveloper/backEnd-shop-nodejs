const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    label: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "category", default: null },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
);

categorySchema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema
  .pre("find", function (next) {
    this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
    next();
  })
  .pre("findOne", function (next) {
    this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
    next();
  });

module.exports = {
  categoryModel: mongoose.model("category", categorySchema),
};
