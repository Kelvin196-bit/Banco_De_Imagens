require('dotenv').config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuração da conta Cloudinary
cloudinary.config({
  cloud_name: process.env.CLAUD_NAME,
  api_key: process.env.CLAUD_API_KEY,
  api_secret: process.env.CLAUD_API_SECRET,
});

// Configuração do Multer para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "meu_projeto", // pasta no Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
