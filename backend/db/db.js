const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nuwani_98:test123@boardmein.k0ku6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    console.log('Database connection Success!');
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
