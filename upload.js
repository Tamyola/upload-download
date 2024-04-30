const multer = require("multer");
const s3 = require('./awsconfig');

// Multer file upload middleware with size and type validation
const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
	fileFilter: function (req, file, cb) {
	  // Allowed file types
	  const allowedTypes = /jpeg|jpg|png|gif/;
	  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	  const mimetype = allowedTypes.test(file.mimetype);
	  if (extname && mimetype) {
		return cb(null, true);
	  } else {
		cb(new Error('Only images are allowed'));
	  }
	}
  });
  

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname));
	}
  });

module.exports = upload;
