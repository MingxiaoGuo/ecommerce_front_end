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
   * GET for edit user profile
   */
  router.get('/edit', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('pages/editUserProfile', { user : req.session.user}); // first user is for nav, second user is for load user information
    } else {
      res.redirect('/login');
    }
  });

  /**
   * POST for edit user profile
   */
  router.post('/edit', function (req, res) {
    console.log(req.body);
    console.log("in edit", req.session.user);

    User.findById(req.user._id, function (err, user) {
      if (err) {
        var message = "Oops, something is wrong";
        console.error(err.stack);
        return res.json({
          result: message
        });
      }
      // check user's scope
      console.log(user);
      // change user's information
      if (req.user.type == "local") {
        user.local.name = req.body.name;
        // TODO: encrypt password
        user.local.password = req.body.password;
      } else if (req.user.type == "facebook") {
        user.facebook.name = req.body.name;
        user.facebook.password = req.body.password;
      } else if (req.user.type == "google") {
        user.google.name = req.body.name;
        user.google.password = req.body.password;
      }
      // save user's new information
      user.save(function (err, updatedUser) {
        if (err) {
          return handleError(err);
        }
        //console.log("after updated", updatedUser);
        // update session
        req.session.user.name = req.body.name;
        if (req.session.user.type == "local") {
          req.session.user.password = updatedUser.local.password;
        } else if (req.session.user.type == "facebook") {
          req.session.user.password = updatedUser.facebook.password;
        } else if (req.session.user.type == "google") {
          req.session.user.google = updatedUser.google.password;
        }
        //console.log("after update, session: ", req.session.user);
        var message = {
          done: true,
          result: "updated"
        };
        // send result back to front end
        return res.json({
          result: message
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