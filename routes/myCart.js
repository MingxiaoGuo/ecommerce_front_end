var express = require("express");
var router = express.Router();
var Product = require("../modules/product");
var Cart = require("../modules/cart");

module.exports = function() {
  router.get("/", function(req, res) {
    if (req.session.user === undefined) {
      console.log("no user in cart");
      res.redirect('/login');
    } else {
      //TODO: load each product
      var productList = [];
      Cart.findOne({"userId" : req.session.user._id}, function(err, cart){
        if (err) {
          console.log("cannot retrieve data from cart");
          throw err;
        }
        //console.log("in cart", cart);
        productList = cart.productList;
        
        console.log(productList);
        res.render("pages/myCart", {user : req.session.user, productList : productList});
      });
      
    }
  });
  
  return router;
}