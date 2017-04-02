var express = require("express");
var router = express.Router();
var Product = require("../modules/product");

module.exports = function () {
  router.get('/', function (req, res) {
    if (req.session.user != undefined && req.session.user.type == "admin") {
      Product.find({}, function (err, users) {
        var productList = [];
        if (err) {
          console.log(err);
          throw(err);
        } else {
          //console.log(users);
          for (var i = 0; i < users.length; i++) {
            productList[i] = users[i];
          }
          //console.log(productList);
          res.render('pages/productManagement', {user: req.session.user, productList : productList} );
        }
      });

    } else {
      res.redirect('/login');
    }
  });

  router.get("/createProduct", function (req, res) {
    console.log("create");
    if (req.session.user != undefined && req.session.user.type == "admin") {
      res.render('pages/productCreate', {user: req.session.user} );
    } else {
      res.redirect('/login');
    }
  });

  router.post("/createProduct", function (req, res) {
    console.log(req.body);
    var newProduct = new Product();
    newProduct.category = req.body.category;
    newProduct.product.price = req.body.price;
    newProduct.product.name = req.body.name;
    newProduct.product.inventory = req.body.inventory;
    newProduct.product.productPhotos = [
      "url1", "url2", "url3"
    ];
    newProduct.product.description = req.body.description;
    /* add new product into database */
    newProduct.save(function (err) {
      if (err) {
        console.log("cannot add product!");
        return res.json({
          type: false,
          result: "cannot add product"
        });
      }
      console.log("registered!")
      return res.json({
        type: true,
        result: "success!"
      });
    });
  });

  /**
   * Render product detail page according to specific product id
   */
  router.get("/productDetail/:productId", function (req, res) {
    console.log(req.params);
    if (req.session.user != undefined && req.session.user.type == "admin") {
      res.render("pages/productDetail", {user: req.session.user, productId: req.params.productId});
    } else {
      res.redirect("/login");
    }
  });





  return router;
};
