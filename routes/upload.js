const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         schema:
 *           type: file
 *           format: binary
 *         required: true
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 */

const upload = require('../multer');
const uploadFileToS3 = require('../uploader');

router.post('/', upload.single('file'), async (req, res) => {
  try {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  //const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('File saved locally');
  //res.json({message: 'File uploaded successfully', imageUrl: imageUrl, filename: req.file.filename });
  console.log("test here",req.file);
  
    const response = uploadFileToS3(req.file.buffer,req.file.originalname,req.file.size,req.file.mimetype)
    console.log('File uploaded to S3:', response)
    res.json({ message: 'File uploaded to S3 successfully', response:response });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
  }
});

module.exports = router;


