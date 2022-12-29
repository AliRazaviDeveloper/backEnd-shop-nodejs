const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    desLike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    categories: { type: [mongoose.Types.ObjectId], required: true },
    comments: { type: [], default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  blogModel: mongoose.model("blog", blogSchema),
};
