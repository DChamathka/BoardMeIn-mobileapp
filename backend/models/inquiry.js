var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Guest = require('./guest');
// var Owner = require('./owner');

var InquirySchema = new Schema(
  {
    /* user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
  inquirytype: {
    type: String,
    required: true,
    enum: ['Place','System','Other']
  },
  reason: {
    type: String,
    required : true ,
  },
  user: {
    type: String,
    enum: ['Guest', 'Owner'],
  }, */
    userid: {
      type: String,
      //required : true ,
    },

    inquirytype: {
      type: String,
      //required: true,
    },

    reason: {
      type: String,
      //required : true ,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Inquiry', InquirySchema);
