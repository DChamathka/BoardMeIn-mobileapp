const Comment = require('../models/comment');

exports.addComment = async (req, res) => {
  try {
    const body = req.body;
    const newcomment = new Comment(body);

    newcomment.save(function (err, comment) {
      if (err) {
        return ;
      }
      return res.json('Comment saved Successfully');
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCommentsByProductId = async (req, res) => {
  const id = req.params.id;

  const comments = await Comment.find({product_id: id});

  res.status(200).json({
    comments: comments,
  });
};

exports.getCommentById = async (req, res) => {
  const id = req.params.id;

  const commentByID = await Comment.find({_id: id});
  res.status(200).json({
    comment: commentByID,
  });
};

exports.getCommentStatistics = async (req, res) => {
  const id = req.params.id;
  const comments = await Comment.find({product_id: id});
  var p_rating = [0, 0, 0, 0, 0, 0];
  var o_rating = [0, 0, 0, 0, 0, 0];
  comments.forEach(comment => {
    p_rating[comment.pRating] += 1;
    o_rating[comment.oRating] += 1;
  });

  const ratings = {
    p_rating,
    o_rating,
  };

  res.status(200).json({
    ratings: ratings,
  });
};

exports.rateAvarage = async (req, res) => {
  const id = req.params.id;
  const count = await Comment.count({product_id: id}).exec();

  const comments = await Comment.find({product_id: id});
  var p_rating = [0, 0, 0, 0, 0, 0];
  var o_rating = [0, 0, 0, 0, 0, 0];

  comments.forEach(comment => {
    p_rating[comment.pRating] += 1;
    o_rating[comment.oRating] += 1;
  });

  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i]*(i+1);
    }
    return total;
  }

  var sum = getArraySum(p_rating);
  const average = Math.round((sum) / count);
  res.status(200).json({
    average: average,
  });
};

exports.deleteComment = async (req, res, next) => {
  const pId = req.body.pId;
  const commentId = req.body.commentId;
  console.log('ids', pId, commentId);

  try {
    await Comment.findByIdAndUpdate(pId, {
      $pull: {comments: {_id: {$eq: commentId}}},
    });
    res.status(201).json({
      message: 'Comment deleted!',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateComment = async (req, res) => {
  const {_id, name, reply} = req.body;

  const replyObj = {name, reply};

  const replies = await getReplies(_id);
  replies.push(replyObj);

  await Comment.updateOne({_id}, {replies});

  res.send('Updated Successfully');
};

const getReplies = async commentId => {
  const comment = await Comment.find({_id: commentId});
  var replies = [];
  if (comment && comment[0].replies) {
    replies = comment[0].replies;
  }
  return replies;
};

exports.addReply = async (req, res, next) => {
  const pId = req.body.pId;
  const commentId = req.body.commentId;
  const reply = req.body.reply;

  try {
    await Comment.updateOne(
      {comments: {$elemMatch: {_id: commentId}}},
      {$push: {'comments.$.replies': reply}},
    );
    const commentsData = await Comment.findById(pId).select('comments');
    res.status(201).json({
      message: 'Comment added!',
      data: commentsData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
