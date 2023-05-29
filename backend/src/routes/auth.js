//Import Packages
const express = require('express');
const fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var salt = bcrypt.genSaltSync(10);

const dotEnv = require('dotenv').config();

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const path = require('path');
const user = require('../models/user.js');
const checkAuth = require('../../middleware/check-auth.js');

const router = express.Router();

// Init Keys
const keyPass = process.env.KEY_PASS;

const RSA_PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, '../../keys/private_key.pem')
);

const decrytedKey = crypto.createPrivateKey({
  key: RSA_PRIVATE_KEY,
  passphrase: keyPass
});



router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});



router.post('/login', (req, res, next) => {
  user.findOne({ email: req.body.email }).then(result => {
    if (!result) {
      res.status(200).json({ status: 'ERRORNOUSER' });
      return;
    }

    if (
      bcrypt.compareSync(req.body.password, result.password)) {
      const jwtBearerToken = jwt.sign({}, decrytedKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        subject: result._id.toString(),
        allowInsecureKeySizes: true
      });
      if (!process.env.ALLOW_LOCAL_STORAGE) {
        res.cookie('SESSIONID', jwtBearerToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000
        });
      }

      res.status(200).json({
        status: 'LOGGEDIN',
        idToken: jwtBearerToken,
        expirest: 3600000
      });
    } else {
      res.status(200).json({ status: 'ERRORPASS' });
    }
  });
});







router.post('/', async (req, res) => {
  const newUser = new user({
    full_name: req.body.name,
    email: req.body.email,
    date_created: Date.now(),
    password: bcrypt.hashSync(req.body.password, salt)
  });

  newUser
    .save()
    .then(result => {
      const jwtBearerToken = jwt.sign({}, decrytedKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        subject: result._id.toString(),
        allowInsecureKeySizes: true
      });
      if (!process.env.ALLOW_LOCAL_STORAGE) {
        res.cookie('SESSIONID', jwtBearerToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
          allowInsecureKeySizes: true
        });
      };
      res.status(200).json({
        message: 'USERCREATED',
        idToken: jwtBearerToken,
        expirest: 3600000,
        err: null
      });

    })
    .catch(error => {
      res.json(error)
    });

})



router.get('/check-logged-in', checkAuth, async (req, res) => {

  res.json({ message: 'Hello!' + req.userData.id })
})
module.exports = router;
