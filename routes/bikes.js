var express = require("express");
var router = express.Router();

module.exports = function (passport) {
  router.get('/', function (req, res) {
    //console.log(passport);
    if (passport === undefined) {
        res.render('pages/bikes');
    } else {
        res.render('pages/bikes', { user : req.user });
    }
  });

  router.get('/men', function (req, res) {
    if (passport === undefined) {
      res.render('pages/mensbikes');
    } else {
      res.render('pages/mensbikes', { user : req.user });
    }
  });

  router.get('/women', function (req, res) {
    if (passport === undefined) {
      res.render('pages/womensbikes');
    } else {
      res.render('pages/womensbikes', { user : req.user });
    }
  });

  router.get('/kids', function (req, res) {
    if (passport === undefined) {
      res.render('pages/kidsbikes');
    } else {
      res.render('pages/kidsbikes', { user : req.user });
    }
  });

  return router;
};
