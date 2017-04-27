/**
 * Created by Mingxiao on 01/19/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../modules/user');

module.exports = function (passport) {
  router.get('/', isLoggedIn, function (req, res) {
    req.session.user = req.user;
    res.render('pages/profile', { user : req.session.user });
  });

  /**
   * GET for editing user profile
   */
  router.get('/edit', function (req, res) {
    if (req.isAuthenticated()) {
      console.log("edit profile[GET]: ", req.session.user);
      res.render('pages/editUserProfile', { user : req.session.user}); // first user is for nav, second user is for load user information
    } else {
      res.redirect('/login');
    }
  });

  /**
   * POST for editing user profile
   */
  router.post('/edit', function (req, res) {
    console.log(req.body);
    var parameter = req.body;
    console.log(parameter.shippingInfo);
    User.findById(req.user._id, function (err, user) {
      if (err) {
        var message = "Oops, something is wrong";
        console.error(err.stack);
        return res.json({
          result: message
        });
      }

      // check user's scope
      console.log("get database's user: " + user);
      // change user's information
      if (req.user.type == "local") {
        user.local.name = req.body.name;
        // TODO: encrypt password
        user.local.password = req.body.password;
      }
      user.shippingInfo = {
        "firstName" : parameter.firstName,
        "lastName" : parameter.lastName,
        "streetAddress" : parameter.streetAddress,
        "city" : parameter.city,
        "state" : parameter.state,
        "zip" : parameter.zip,
        "phoneNumber" : parameter.phoneNumber
      };
      // save user's new information
      user.save(function (err, updatedUser) {
        if (err) {
          return handleError(err);
        }
        console.log("after updated", updatedUser);
        // update session
        var currentType = req.session.user.type;
        req.session.user.shippingInfo = updatedUser.shippingInfo;
        req.session.user.type = currentType;
        console.log("facebook attri", updatedUser[currentType]);
        req.session.user.profilePhoto = updatedUser[currentType].profilePhoto;
        req.session.user.name =  updatedUser[currentType].name;
        req.session.user.subId = updatedUser[currentType].id;
        req.session.user.email = updatedUser[currentType].email;
        console.log("after update, session: ", req.session.user);
        // send result back to front end
        return res.json({
          done: true,
          message: "updated"
        });
      });
    })

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