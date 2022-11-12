const path = require('path');
const multer = require('multer');

const imagesDirectory = path.join(__dirname, 'public/images');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, imagesDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
});

const uploadsMiddleware = multer({ storage }).single('photoFile');

module.exports = uploadsMiddleware;
