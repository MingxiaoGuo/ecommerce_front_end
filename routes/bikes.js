var express = require("express");
var router = express.Router();

module.exports = function (passport) {
  router.get('/', function (req, res) {
    //console.log(passport);
    if (req.session.user == undefined) {
        res.render('pages/bikes');
    } else {
        res.render('pages/bikes', { user : req.session.user });
    }
  });

  router.get('/men', function (req, res) {
    if (req.session.user == undefined) {
      res.render('pages/mensbikes');
    } else {
      //console.log("in men biek", req.session.user);
      res.render('pages/mensbikes', { user : req.session.user });

    }
  });

  router.get('/women', function (req, res) {
    if (req.session.user == undefined) {
      res.render('pages/womensbikes');
    } else {
      res.render('pages/womensbikes', { user : req.session.user });
    }
  });

  router.get('/kids', function (req, res) {
    if (req.session.user == undefined) {
      res.render('pages/kidsbikes');
    } else {
      res.render('pages/kidsbikes', { user : req.session.user });
    }
  });

  return router;
};
