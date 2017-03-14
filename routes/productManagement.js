var express = require("express");
var router = express.Router();

module.exports = function () {
  router.get('/', function (req, res) {
    var productList = [

    ];
    res.render('pages/productManagement');

  });

  return router;
}
