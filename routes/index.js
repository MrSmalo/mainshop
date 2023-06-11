var express = require('express');
var router = express.Router();
const list = require('./list.json');
const navbar = require('./navbar.json');


/* GET home page. */
router.get('/', function (req, res, next) {
  const entries = Object.entries(list);
  res.render('pages/home', { ent: entries, navbar });
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

module.exports = router;
