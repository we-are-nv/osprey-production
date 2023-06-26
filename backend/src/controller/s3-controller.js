const {
	PutObjectCommand,
	S3Client,
	GetObjectCommand,
	DeleteObjectCommand
} = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../', '../', '.env') });

const ID = process.env.AWS_ACCESS_KEY;
const SECRET = process.env.AWS_SK;
const BUCKET_NAME = process.env.AWS_BUCKET;
const REGION = process.env.REGION;

const s3 = new S3Client({
	credentials: { accessKeyId: ID, secretAccessKey: SECRET },
	region: REGION
});

const uploadCatImage = async (file, name, fileType) => {
	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: `products/categories/images/${name}`,
		ContentType: 'image/' + fileType,
		Body: fs.readFileSync(file)
	});

	try {
		const response = await s3.send(command);
		//console.log(response);
		rimraf.sync(file);
	} catch (err) {
		console.error(err);
	}
};

const deleteImage = async key => {
	const command = new DeleteObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key
	});

	try {
		const response = await s3.send(command);
		console.log(response);
	} catch (err) {
		console.error('err' + err);
	}
};

const uploadBase = async (productType, cat, name, binary, imageType) => {
	var buf = Buffer.from(binary.replace(/^data:image\/\w+;base64,/, ''), 'base64');

	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: `products/${cat}/${productType}/images/${imageType}/${name}`,
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

const uploadBaseMarket = async (key, binary) => {
	var buf = Buffer.from(binary.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key,
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

const uploadFileMarket = async (key, type, binary) => {
	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key,
		Body: binary,
		ContentType: type
	});
	//
	try {
		const response = await s3.send(command);
		//console.log(response);
	} catch (err) {
		console.error(err);
	}
};

const test = async (file, name, type) => {
	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: `products/categories/images/${name}`,
		Body: fs.readFileSync(file),
		ContentType: `image/${type}`
	});
	//
	try {
		const response = await s3.send(command);
		//console.log(response);
	} catch (err) {
		console.error(err);
	}
};

//test('C:\\Users\\jc305\\Pictures\\word\\anpr.png','648dad795f038ab01ad76d1d','png')

module.exports = {
	uploadCatImage,
	uploadBase,
	deleteImage,
	uploadBaseMarket,
	uploadFileMarket
};
