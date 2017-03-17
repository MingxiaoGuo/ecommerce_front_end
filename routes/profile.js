/**
 * Created by Mingxiao on 01/19/2017.
 */
var express = require('express');
var router = express.Router();

module.exports = function (passport) {
  router.get('/', isLoggedIn, function (req, res) {
    res.render('pages/profile', { user : req.user });
  });

  router.get('/edit', function (req, res) {
    // different login methods require different ways to edit profile

    var user = {
      _id: req.user._id,
      type: "local",
      profile: {}
    };
    // console.log(req.user.facebook.id);
    if (req.user.local.email != undefined) {
      user.profile = req.user.local;
    } else if (req.user.facebook.id != undefined) {
      user.profile = req.user.facebook;
      user.type = "facebook";
    } else {
      user.profile = req.user.google;
      user.type = "google";
    }
    console.log(user);
    if (req.isAuthenticated()) {
      res.render('pages/editUserProfile', { user : req.user, profileUser: user});
    } else {
      res.redirect('/login');
    }
  });

    return router;
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      //console.log("in isLoggedIn, check req is authenticate or not");
      return next();
  }
  res.redirect('/login');
}