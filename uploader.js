const AWS = require('aws-sdk');
const Images = require('./models/store'); 

const s3 = new AWS.S3();

const uploadFileToS3 = (fileData,originalFilename,fileSize,fileType) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: originalFilename,
    Body: fileData, 
    ContentType: 'image/jpeg', 
  };

  s3.upload(params, async(err, data) => {
    if (err) {
      console.error('Error uploading file to S3:', err);
    } else {
      console.log('File uploaded:', data.Location);
      
      const newFile = new Images({
        fileName: originalFilename,
        fileSize:  fileSize, 
        fileType:  fileType,
        s3Link: data.Location,
      });

      try {
        let res =await newFile.save();
        console.log('Saved Sucessfully', res)
      } catch (error) {
        console.log('Not Saved Sucessfully', error)
      }
    }   
});
}

module.exports = uploadFileToS3;
