var express = require('express');
var router = express.Router();
const list = require('./list.json');
const totalpay = require('./cart.json');
const navbar = require('./navbar.json');
const products = require('./data.json');
const selectedProducts = require('./checkout.json');
const fs = require('fs');
const path = require('path');



const mongoose = require('mongoose');
const Product = require('../models/page');
const Cart = require('../models/cart');
const Price = require('../models/addedPrice');



var cartData = {
  totalSum: 0
};






router.post('/prod', async (req, res) => {

  const productData = req.body;
  const product = new Product(productData);
  await product.save();

  // const products = await Product.find(); // to show to products

});


// remove product from checkout cart
router.post('/remove-product-checkout', async (req, res) => {
  const { productId } = req.body;
  await Cart.findByIdAndRemove(productId);

  res.sendStatus(200); // send a confirm status code

});





router.post('/checkoutSum', async (req, res, next) => {
  try {
    const productData = req.body;
    const currPrice = await Price.findOne({});

    let totalSum = productData.totalSum;

    if (currPrice) {
      totalSum += currPrice.totalSum;
    }

    await Price.findOneAndUpdate({}, { totalSum }, { upsert: true });
    res.sendStatus(200); // send a confirm status code
  }
  catch {
    res.sendStatus(500); // send an error status code
  }
});

router.post('/checkoutSumRemove', async (req, res, next) => {

  const productData = req.body;
  const productId = productData.productId;

  const cartProduct = await Cart.findOne({ productId });

  if (!cartProduct) {
    return res.sendStatus(404);  // product doesn't exist in the "Cart"
  }

  const currPrice = await Price.findOne({});
  let totalSum = productData.totalSum;

  if (currPrice) {
    totalSum = currPrice.totalSum - totalSum;
  }
  if (totalSum < 0) {
    totalSum = 0;
  }
  await Price.findOneAndUpdate({}, { totalSum }, { upsert: true });
  res.sendStatus(200);

});










// remove all products from checkout cart
router.post('/remove-all', async (req, res) => {
  try {

    await Cart.deleteMany();

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error removing product', error);
    res.status(500).json({ error: 'Error removing product' });
  }
});



router.post('/checkoutSumReset', async (req, res, next) => {

  const productData = req.body;
  const currPrice = await Price.findOne({});
  let totalSum = productData.totalSum;

  if (currPrice) {
    totalSum = 0.00;
  }
  await Price.findOneAndUpdate({}, { totalSum }, { upsert: true });
  res.sendStatus(200);

});







// remove product from database
router.post('/remove-product', async (req, res) => {
  try {
    const { productId } = req.body;

    await Product.findByIdAndRemove(productId);

    res.sendStatus(200);
  }
  catch {
    res.sendStatus(500);
  }
});




router.get('/', async (req, res, next) => {
  const products = await Product.find();
  const total = await Price.find();

  res.render('pages/home', { products, total, navbar });
});







router.get('/', async (req, res, next) => {
  const products = await Product.find();
  res.render('pages/home', { products, navbar, totalSum: cartData.totalSum });
});




router.get('/about', function (req, res, next) {
  res.render('pages/about', { navbar });
});

router.get('/contact', function (req, res, next) {
  res.render('pages/contact', { navbar });
});

router.get('/product', function (req, res, next) {
  res.render('pages/product', { navbar });
});

router.get('/login', function (req, res, next) {
  res.render('pages/login', { navbar });
});




router.get('/checkout', async (req, res, next) => {

  const products = await Cart.find();
  const total = await Price.find();

  res.render('pages/checkout', { products, total, navbar });
});










router.get('/add', function (req, res, next) {
  res.render('pages/add', { navbar });
});


// router.post('/checkoutCart', async (req, res, next) => {

//   const productData = req.body;
//   const checkoutCart = new Cart(productData);

//   await checkoutCart.save();
//   res.sendStatus(200); // send a success status code

// });




router.post('/checkoutCart', async (req, res, next) => {

  const productData = req.body;
  const productId = productData.productId;
  const quantity = productData.quantity;
  const title = productData.title;

  console.log(productId);

  const productExist = await Cart.findOne({ title });
  console.log(productExist);


  if (productExist && productExist.quantity > 0) {

    productExist.quantity = quantity;
    await productExist.save();
    res.sendStatus(200); // send a success status code
  }
  else if (!productExist && quantity > 0) {

    const checkoutCart = new Cart(productData);
    await checkoutCart.save();
    res.sendStatus(200); // send a success status code
  }
  else {
    res.sendStatus(500); // send an error status code
  }

});




module.exports = router;
