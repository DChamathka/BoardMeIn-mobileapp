const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const BookSchema = new mongoose.Schema(
  {
    buyerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
      required: true,
    },
    propertyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
  },
  {timestamps: true},
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
