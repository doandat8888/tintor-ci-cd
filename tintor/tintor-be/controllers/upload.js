const cloudinary = require('../configs/cloudinary');

module.exports = {
  uploadImage: function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(err, result) {
      if (err) {
        console.log('Error:', err);
        return res.status(400).json({ message: err.message });
      }
      res.status(200).json({
        message: 'Image uploaded successfully',
        data: result,
      })
    })
  }
}

