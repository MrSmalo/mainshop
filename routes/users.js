var express = require('express');
var router = express.Router();
const navbar = require('./navbar.json');
const UserModel = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware')

/* GET users listing. */
router.get('/', protect, (req, res, next) => {
  console.log(req.user);
  res.render('user/userpage', { navbar });

});

router.get('/login', function (req, res, next) {
  res.render('user/loginpage', { navbar })
})

router.post('/login', async function (req, res, next) {
  const mail = req.body.mail;
  console.log(mail);
  user = await UserModel.findOne({ mail: mail })
  if (user && user.password === req.body.password) {
    res.cookie('token', generateToken(user._id))
    res.redirect('/users');
  } else {
    res.redirect('/users/login')
  }
})

router.get('/signin', function (req, res, next) {
  res.render('user/signinpage', { navbar })
})

router.post('/signin', async function (req, res, next) {
  try {
    const userData = req.body;
    const user = new UserModel(userData)
    await user.save();
    res.cookie('token', generateToken(user._id))
    res.redirect('/')
  }
  catch (error) {

  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

router.get('/confirmation', async function (req, res, next) {

  const user = await UserModel.find();

  res.render('user/confirmation', { navbar });
});


module.exports = router;
