// routes for the admin pages
var express = require('express');
var router = express.Router();
const list = require('./list.json');
const navbar = require('./navbar.json');
const FB = require('fb');

const mongoose = require('mongoose');
const Product = require('../models/page');
const Contact = require('../models/contact');

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


router.post('/delete-message', async (req, res) => {
    try {
        const { messageId } = req.body;
        await Contact.deleteOne({ _id: messageId });
        res.json({ success: true });
    }

    catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});





router.get('/add-product', function (req, res, next) {

    res.render('admin/add_product', { navbar });

});




router.get('/delete-product', async (req, res, next) => {
    const products = await Product.find();
    res.render('admin/delete-product', { products, navbar });
});




router.get('/watch-requstes', async (req, res, next) => {

    const contacts = await Contact.find();

    res.render('admin/watch-requstes', { contact: contacts, navbar });
});

router.get("/facebook",async(req,res,next)=>{
    const message = req.cookies.message
    res.clearCookie('message')
    FB.api(
        '/109915792196614/feed',
        'GET',
        function(r){
            res.render('admin/facebook',{navbar,r,message});
        }
    )
})

router.get("/facebook/delete",async(req,res,next)=>{
    FB.api(
        `/${req.query.id}`,
        'DELETE',
        function(r){
            res.cookie('message',`post deleted`)
            res.redirect('./');
        }
    )

})

router.get("/facebook/create",async(req,res,next)=>{
    res.cookie('message','post created')
    res.render("admin/facebookCreate",{navbar})
})

router.post("/facebook/create",async(req,res,next)=>{
    FB.api(
        '/109915792196614/feed',
        'POST',
        {'message': req.body.message},
        function (r) { 
            res.redirect('/admin/facebook')
         }
    )
})

router.get("/facebook/update",async(req,res,next)=>{
    FB.api(
        `/${req.query.id}`,
        'GET',
        function(r){
            res.render('admin/facebookUpdate',{navbar,r});
        }
    )
})

router.post("/facebook/update",async(req,res,next)=>{
   
    FB.api(
        `/${req.query.id}`,
        'POST',
        {'message':req.body.message},
        function(r){
            console.log(r);
            res.cookie('message','post updated')
            res.redirect('/admin/facebook')
        }
    )
})

module.exports = router;