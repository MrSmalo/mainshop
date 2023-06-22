// routes for the admin pages
var express = require('express');
var router = express.Router();
const list = require('./list.json');
const navbar = require('./navbar.json');


const mongoose = require('mongoose');
const Product = require('../models/page');
const Cart = require('../models/addedPrice');


// router.get('/', function (req, res, next) {
//     res.send('This is the admin area');

// });

router.get('/', (req, res, next) => {

    res.render('admin/admin', { navbar });
});





router.post('/prod', async (req, res) => {

    const productData = req.body;
    const product = new Product(productData);
    await product.save();

    const products = await Product.find(); // retrieve all products

});



router.post('/remove-product', async (req, res) => {
    try {
        const { productId } = req.body;


        await Product.findByIdAndRemove(productId);

        res.sendStatus(200);
    }
    catch
    {
        res.sendStatus(500);
    }
});








router.get('/add-product', function (req, res, next) {

    res.render('admin/add_product', { navbar });

});







router.get('/delete-product', async (req, res, next) => {
    const products = await Product.find();
    res.render('admin/delete-product', { products, navbar });
});




module.exports = router;