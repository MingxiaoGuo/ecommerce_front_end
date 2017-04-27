/**
 * Created by Mingxiao Guo on 4/19/2017.
 */
var express = require('express');
var router = express.Router();
var User = require("../modules/user");
var allUsers = [];

module.exports = function (passport) {
  router.get("/", function (req, res) {
    allUsers = []; /* clear list for each get request */
    if (req.isAuthenticated()) {
      /* Retrieve all user data */
      User.find({}, function (err, users) {
        if (err) {
          console.log(err);
          throw err;
        }
        
        for (let i = 0; i < users.length; i++) {
          /* skip admin account */
          if (users[i].admin.email != undefined) {
            continue;
          }
          /* parse user account */
          allUsers.push(parseUser(users[i]));
        }
        console.log(allUsers);
        res.render("pages/userManagement", {user : req.session.user, userList : allUsers});
      });
    } else {
      res.redirect("/admin");
    }
  });
  
  router.get("/detail/:userId", function(req, res) {
    console.log(req.params.userId);
    var currentUser = {};
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i]._id == req.params.userId) {
        currentUser = allUsers[i];
      }
    }
    res.render("pages/userDetail", {user : req.session.user, currentUser : currentUser});
  });
  
  return router;
};

/**
 * Parse database user profile to understandable data structure
 */
var parseUser = function (user) {
  var result = {};
  result.shippingInfo = user.shippingInfo;
  result._id = user._id;
  /* check type */
  if (user.facebook.id !== undefined) {
    result.type = "facebook";
  } else if (user.google.id !== undefined) {
    result.type = "google";
  } else {
    result.type = "local";
  }
  /* get different account according to type */
  result.name = user[result.type].name;
  result.email = user[result.type].email;
  result.profilePhoto = user[result.type].profilePhoto;
  if (result.type == "local") {
    result.subId = user._id;
  } else {
    result.subId = user[result.type].id;
  }
  /*console.log("result:", result);*/
  return result;
}
