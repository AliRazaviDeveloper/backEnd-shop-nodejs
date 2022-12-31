const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  label: { type: String, required: true },
  parent: { type: Boolean, default: true },
  children: { type: mongoose.Types.ObjectId, default: null },
});

module.exports = {
  categoryModel: mongoose.model("category", categorySchema),
};
