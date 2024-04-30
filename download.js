const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:fileName', (req, res) => {
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

module.exports = router;
