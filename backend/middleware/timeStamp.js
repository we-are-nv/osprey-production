const express = require('express');
const app = express()

const timeStamp = (req,res,next){
	req.timestamp = new Date().toISOString;
	next()
}