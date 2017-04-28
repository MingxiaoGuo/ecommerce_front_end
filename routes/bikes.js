var express = require("express");
var router = express.Router();
var Product = require("../modules/product");
var Cart = require("../modules/cart");

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
    Product.find({}).select("category product").where("category").equals("men").
    exec(function (err, productList) {
      console.log(productList);
      if (req.session.user == undefined) {
        res.render('pages/mensbikes', {productList : productList});
      } else {
        //console.log("in men bike", req.session.user);
        res.render('pages/mensbikes', { user : req.session.user, productList: productList });
      }
    });


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
  
  router.get('/productDetail/:productId', function (req, res) {
    //console.log(req.params);
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
        //console.log(prod);
        product._id = prod._id + "";
        product.name = prod.product.name;
        product.category = prod.category;
        product.price = prod.product.price;
        product.inventory = prod.product.inventory;
        product.photos = prod.product.productPhotos;
        //product.description = prod.product.description.split("\n");
        var descriptionList = prod.product.description.split("\n");
        console.log(descriptionList);
        product.description = descriptionList;
        console.log(product);
        if (req.session.user != undefined) {
          res.render("pages/productDetail", {user: req.session.user, product: product});
        } else {
          res.render("pages/productDetail", {product: product});
        }
      }
    });


    router.post("/productDetail", function (req, res) {
      var product_id = req.body.id;
      console.log(req.session.user._id);
      Cart.findOne({ "userId" : req.session.user._id }, function (err, cart) {
        if (err) {
          throw err;
        }
        console.log(cart);
        cart.productList.push(product_id);
        cart.save(function (err, updatedCart) {
          if (err) {
            console.log(err) ;
            res.json({
              done: false,
              message: "Cannot add this product into cart"
            })
          }
          res.json({
            done: true,
            message: "Product added"
          });
        })
      })
    });

  });

  return router;
};
