/**
 * Created by Mingxiao on 2/9/2017.
 */
var express = require('express');
var router = express.Router();
var http = require('http');

module.exports = function (passport) {
  /**
  * Render Overview Dashboard
  */
  router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      console.log("===================in server========================");
      //TODO: put arn into session

/*      var arn = "arn:aws:elasticloadbalancing:us-west-2:028608460179:loadbalancer/app/ecommerceELB/eb271886c59fa339";
      // var path = "/getelbstatsall?elbarn=" + arn;
      var path = "/getec2statsall"
      var result = "";
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: path,
        method: 'GET'
      };

      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          //console.log(`BODY: ${chunk}`);
          result += chunk;
        });
        res.on('end', () => {
          console.log('No more data in response.');
          console.log("result", result);
          var parsed = JSON.parse(result);
          console.log("json", parsed);
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });

      // write data to request body
      //req.write();
      req.end();*/





      var serverList = [
        {
          location: "California",
          status: "stopped",
          instance_type: "t2-micro",
          cost: 2
        },
        {
          location: "California",
          status: "running",
          instance_type: "t2-micro",
          cost: 2
        },
        {
          location: "California",
          status: "running",
          instance_type: "t2-micro",
          cost: 2
        }
      ];

      var loadBalancer = {
        attribute1: "value1",
        attribute2: "value2",
        attribute3: "value3"
      };

      res.render('pages/serverManagement', {user: req.user, serverList: serverList, loadBalancer: loadBalancer});
    } else {
      console.log('not authed');
      res.redirect('/admin/login');
    }
  });

  /**
   *
   */
  router.get("/createServer", function () {
    console.log("in create server");
  });


  return router;
};
