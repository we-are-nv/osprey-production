const { PutObjectCommand, S3Client, GetObjectCommand  } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');

dotenv.config({path:path.join(__dirname,'../','../','.env')});


const ID = process.env.AWS_ACCESS_KEY;
const SECRET = process.env.AWS_SK;
const BUCKET_NAME = process.env.AWS_BUCKET;
const REGION = process.env.REGION;

const s3 = new S3Client({ credentials:{ accessKeyId: ID, secretAccessKey: SECRET, }, region:REGION });

const uploadCatImage = async (file,name,fileType) => {
  const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `products/categories/images/${name}`,
      ContentType: 'image/'+fileType,
      Body: fs.readFileSync(file),
    });

  try {
    const response = await s3.send(command);
   //console.log(response);
   rimraf.sync(file);
  } catch (err) {
    console.error(err);
  }
};

const uploadBase = async (productType,cat,name,binary) => {
  var buf = Buffer.from(binary.replace(/^data:image\/\w+;base64,/, ""),'base64');

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `products/${cat}/${productType}/images/${name}`,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: `image/${binary.split(';')[0].split('/')[1]}`
  });
//
  try {
    const response = await s3.send(command);
   //console.log(response);

  } catch (err) {
    console.error(err);
  }
};

module.exports = {uploadCatImage,uploadBase};
