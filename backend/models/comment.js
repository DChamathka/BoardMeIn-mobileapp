const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchma = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    pRating: { type: Number, default: 0 },
    oRating: { type: Number, default: 0 },
    gId: { type: String, require: true },
    gName: { type: String, require: true },
    product_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchma);

module.exports = Comment;