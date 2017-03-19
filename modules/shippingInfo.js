/**
 * Created by Mingxiao on 3/18/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shippingSchema = new Schema({
  shippingInfo : {
    street_address: String,
    city: String,
    state: String,
    zip: String,
    phone_number: String
  }
});

module.exports = mongoose.model('ShippingInfo', shippingSchema);