const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    name: {
      type: String,
    },

    reply: { type: String },
    commentId: { type: String },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;