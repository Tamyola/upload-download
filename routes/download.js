const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const s3 = new S3Client({ region: process.env.AWS_REGION });

router.get('/:fileName', async (req, res) => {

  const fileName = req.params.fileName;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 30 }); 
  
    
    res.redirect(signedUrl);
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

module.exports = router;

