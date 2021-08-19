const Reply = require("../models/reply");

exports.addReply = async (req, res) => {
  const { body } = req;
  const reply = new Reply(body);

  await reply.save();

  return res.status(200).json({
    message: "Reply saved",
  });
};

exports.getReplyByCommentId = async (req, res) => {
  const { id } = req.params;
  console.log("gettign replies");
  console.log(id);
  const replies = await Reply.find({ commentId: id });

  return res.status(200).json({
    replies: replies,
  });
};