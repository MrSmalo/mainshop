var express = require('express');
var router = express.Router();
const navbar = require('./navbar.json');


router.get('/', function (req, res, next) {
    res.send('This is the admin area');

});


router.get('/add-product', function (req, res, next) {

    res.render('admin/add_product', { navbar });

});


router.get('/orders', function (req, res, next) {

    res.render('admin/orders', { navbar });

});


module.exports = router;