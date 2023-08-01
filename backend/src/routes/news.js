const express = require('express');
const dotenv = require('dotenv');
const getAllNews = require('../controller/getNews');
dotenv.config();

const router = express.Router();

router.use(function timelog(req, res, next) {
	console.log(`Time: ${Date.now()}`);
	next();
});

// router.get('/', async (req,res)=> {

// 	res.status(200).json({message: 'news route successful'})
// })

router.get('/', getAllNews);

module.exports = router;
