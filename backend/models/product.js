const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
      
    },
    images: {
      type: Object,
      required: true
    },
    location:{
        type:String
    },
    lat:{
      type:Number
    },
    lng:{
      type:Number
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Products', productSchema);
