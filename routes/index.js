var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //require to our json object filr
  const jsonData = require('./navBar.json')
  // define entries of object
  const entries = Object.entries(jsonData)

  res.render('index', {ent : entries});

});

module.exports = router;
