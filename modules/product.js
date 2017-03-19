/**
 * Created by Mingxiao on 3/18/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  category: String,
  product: {
    price: String,
    name: String,
    inventory: String,
    productPhotos: Array,
    description: String
  }
});

module.exports = mongoose.model('Product', productSchema);