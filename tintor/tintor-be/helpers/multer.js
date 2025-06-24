const multer = require('multer');
const cloudinary = require('../configs/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png', 'gif'],
  params: {
    folder: 'tintor'
  }
})

const upload = multer({ storage: storage });

module.exports = upload;