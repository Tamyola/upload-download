const express = require('express');
const app = express();
const multer = require("multer");
const path = require('path');
const fs = require('fs');

 const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname));
	}
  });

const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 }, 
	fileFilter: function (req, file, cb) {
	  const allowedTypes = /jpeg|jpg|png|gif/;
	  const mimetype = allowedTypes.test(file.mimetype);
	  if (mimetype) {
		return cb(null, true);
	  } else {
		cb(new Error('Only images are allowed'));
	  }
	}
  });

 
// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('File saved locally');
  
  res.json({message: 'File uploaded successfully', imageUrl: imageUrl, filename: req.file.filename });
});

// File download endpoint
app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
