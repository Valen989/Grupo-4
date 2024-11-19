// multer-config.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'your_folder_name',
    allowedFormats: ['jpg', 'png'],
  });
const upload = multer({ storage: storage });

module.exports = upload;
