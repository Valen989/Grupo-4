const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports ={
    upload:  async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.buffer, {
                folder: 'your_folder_name'
              });
              
              res.status(200).json({ imageUrl: result.secure_url });
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Error al subir la imagen' });
            }
            
},
};