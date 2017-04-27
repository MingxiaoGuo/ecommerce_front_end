var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    router.get('/', function(req, res) {
        console.log("====in index====", req.user);
        if (req.user != undefined) {
          req.session.user = req.user;
          res.render('pages/index', { user : req.session.user });
        } else {
          res.render('pages/index');
        }
    });

    return router;
};
