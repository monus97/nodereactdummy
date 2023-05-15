const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemPrice : {
    type : String,
  },
  itemDiscription : {
    type : String,
  },
  images : {
    type : String,
  }
});
itemSchema.set('timestamps',true);
module.exports = mongoose.model('Item',itemSchema)