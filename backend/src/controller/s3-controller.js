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

console.log(REGION)
const s3 = new S3Client({ credentials:{ accessKeyId: ID, secretAccessKey: SECRET, }, region:REGION });

const uploadFile = async (file,name,productType,fileType) => {
  const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `products/${productType}/images/${name}`,
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


module.exports = {uploadFile};
