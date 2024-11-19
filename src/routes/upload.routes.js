// uploadRoutes.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const {upload} = require('../controllers/uploadController');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', upload);

module.exports = router;
