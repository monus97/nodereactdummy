const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemPrice : {
    type : Number,
  },
  itemDiscription : {
    type : String,
  },
  images : {
    type : String,
  }
});

module.exports = mongoose.model('Item',productSchema)