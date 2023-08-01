const express = require('express')
const news_article = require('../models/news')
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()

router.use(function timelog(req,res, next) {
	console.log(`Time: ${Date.now()}`)
	next()
})

router.get('/', async (req,res)=> {
	res.status(200).json({message: 'news route successful'})
})


module.exports = router