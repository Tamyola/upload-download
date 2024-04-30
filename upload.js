const express = require('express');
const router = express.Router();
const upload = require('./multer');

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('File saved locally');
  
  res.json({message: 'File uploaded successfully', imageUrl: imageUrl, filename: req.file.filename });
});

module.exports = router;
