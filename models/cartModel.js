const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    items: [
      {
        _id: false,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default : 1
        },
        subTotal: {
          type: Number,
          default : 0
        },
      },
    ],
    total: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", CartSchema);
