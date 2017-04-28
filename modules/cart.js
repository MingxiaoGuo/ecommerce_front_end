/**
 * Created by Mingxiao Guo on 4/15/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userId: String,
  productList: Array // id list
});

module.exports = mongoose.model('Cart', cartSchema);