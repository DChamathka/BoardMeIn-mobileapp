const router = require('express').Router();
const upload = require('../config/multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post('/upload', upload.single('images'), async (req, res) => {
  try {
    // Upload image to cloudinary
    cloudinary.uploader.upload(
      req.file.path,
      {folder: 'test'},
      async (err, result) => {
        const myJson = {public_id: result.public_id, url: result.secure_url};
        res.json(myJson);
      },
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
