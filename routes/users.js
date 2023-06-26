var express = require('express');
var router = express.Router();
const navbar = require('./navbar.json');
const cartModel = require('../models/cart');
const UserModel = require('../models/user')
const orderModel = require('../models/order')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware')
const { isLogin } = require('../middleware/isLoginMiddleware');
const axios = require('axios')

/* GET users listing. */
router.get('/', protect, async (req, res, next) => {
  const user = res.user
  await user.populate('order');
  res.render('user/userpage', { navbar, user });

});

router.get('/clearOrders', protect, async (req, res, next) => {
  const user = res.user;
  await orderModel.deleteMany({ 'user': user._id });
  await user.updateOne({ 'order': [] });
  await user.updateOne({ 'numOfOrders': 0 })
  res.redirect('/users');
})

router.get('/login', isLogin, function (req, res, next) {
  res.render('user/loginpage', { navbar })
})

router.post('/login', isLogin, async function (req, res, next) {
  const mail = req.body.mail;
  user = await UserModel.findOne({ mail: mail })
  if (user && user.password === req.body.password) {
    res.cookie('token', generateToken(user._id))
    res.redirect('/users');
  } else {
    res.redirect('/users/login')
  }
})

router.get('/signin', isLogin, function (req, res, next) {
  res.render('user/signinpage', { navbar })
})

router.post('/signin', isLogin, async function (req, res, next) {
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

router.get("/logout", protect, function (req, res, next) {
  res.clearCookie('token')
  res.redirect('/')
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

router.post('/confirmation', protect, async function (req, res, next) {

  if (!req.body.prodTitle) {
    res.redirect('/')
    return
  }

  const user = res.user;
  user.numOfOrders++;
  for (let i = 0; i < req.body.prodQuantity.length; i++) {

    const order = new orderModel({
      product: req.body.prodTitle[i],
      price: req.body.prodPrice[i],
      quantity: req.body.prodQuantity[i],
      user: user._id,
      orderNo: user.numOfOrders
    })
    user.order.push(order._id);
    await order.save();
    await user.updateOne(user);
  }
  await axios.post('http://localhost:3000/checkoutSumReset')
  await axios.post('http://localhost:3000/remove-all')

  res.render('user/confirmation', { navbar });
});


module.exports = router;
