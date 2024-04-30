const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIA2UC3BF7WVNEG2E4F',
  secretAccessKey: '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',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

module.exports = s3;