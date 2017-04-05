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
  router.get("/productModify/:productId", function (req, res) {
    console.log(req.params);
    // get product from database
    var product = {
      _id : String,
      name : String,
      category : String,
      price : String,
      inventory : String,
      photos : String,
      description : String
    };
    Product.findOne({_id: req.params.productId}, "_id category product", function (error, prod) {
      if (error) {
        console.log(error);
        throw(error);
      } else {
        console.log(prod);
        product._id = prod._id + "";
        product.name = prod.product.name;
        product.category = prod.category;
        product.price = prod.product.price;
        product.inventory = prod.product.inventory;
        product.photos = prod.product.productPhotos;
        product.description = prod.product.description/*.split("\n")*/;
        // console.log(product);
        // var descriptionList = product.product.description.split("\n");
        // console.log(descriptionList);
        // product.product.description = [];
        // product.product.description = descriptionList;
        console.log(product);
        if (req.session.user != undefined && req.session.user.type == "admin") {
          res.render("pages/productModify", {user: req.session.user, product: product});
        } else {
          res.redirect("/login");
        }
      }
    });

  });

  router.post("/productModify", function (req, res) {
    console.log(req.body.category);
    // update data in database
    var updatedData = req.body;
    Product.findOne({_id: updatedData._id}, "_id category product", function (err, bike) {
      console.log(bike);
      if (err) {
        console.log(err);
        // return json with fail message
        return res.json({
          type: false,
          message: "Cannot update product with id = " + updatedData._id
        });
      }
      if (bike == null) {
        console.log(err);
        // return json with fail message
        return res.json({
          type: false,
          message: "Cannot update product with id = " + updatedData._id
        });
      }
      bike.category = updatedData.category;
      bike.product.description = updatedData.description;
      bike.product.name = updatedData.name;
      bike.product.price = updatedData.price;
      bike.product.inventory = updatedData.inventory;
      bike.save(function (err, updatedBike) {
        if (err) {
          console.log(err);
          // return json with fail message
          return res.json({
            type: false,
            message: "Cannot update product with id = " + updatedData._id
          });
        }
        return res.json({
          type: true,
          message: "Updated!"
        });
      });
    });
  });



  return router;
};
