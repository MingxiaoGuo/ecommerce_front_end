/**
 * Created by Mingxiao Guo on 4/15/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  userId: String,
  productList: Array,
  timestamp: String,
  shippingAddress : {
    firstName: String,
    lastName: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    phoneNumber: String
  },
  totalPrice: String
});

module.exports = mongoose.model('Order', orderSchema);