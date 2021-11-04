const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/s3config.json');
const s3 = new AWS.S3();
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWSAccessKeyId,
//   secretAccessKey: process.env.AWSSecretKey,
//   region: process.env.AWSREGION,
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pinterestclonecoding',
    // contentType: multerS3.AUTO_CONTENT_TYPE,  // image/jpeg
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
});

module.exports = upload;
