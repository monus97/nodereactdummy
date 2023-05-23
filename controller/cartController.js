const Cart = require("../models/cartModel");
const Item = require("../models/itemModel");
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    console.log(cart, "...........");
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send("null");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    let carts = await Cart.findOne({ userId });
    const price = await Item.findOne({ _id: productId });

    if (carts) {
      const itemIndex = carts.items.findIndex(
        (item) => item.productId == productId
      );

      if (itemIndex > -1) {
        const Quantity = carts.items[itemIndex].quantity;
        carts.items[itemIndex].quantity = Quantity + 1;
        carts.items[itemIndex].subTotal = (Quantity + 1) * price.itemPrice;
        const totalAmount = carts.items.reduce((count, item) => {
          return (count += item.subTotal);
        }, 0);
        carts.total = totalAmount;
        await carts.save();
        res.send(carts);
      } else if (itemIndex == -1) {
        const subTotal = 1 * price.itemPrice;
        carts.items.push({ productId, subTotal: subTotal });
        await carts.save();
        const totalAmount = carts.items.reduce((count, item) => {
          return (count += item.subTotal);
        }, 0);
        carts.total = totalAmount;
        await carts.save();
        res.send(carts);
      }
    } else {
      const subTotal = 1 * price.itemPrice;
      const cart = await Cart.create({
        userId,
        items: [{ productId, subTotal: subTotal }],
      });
      const totalAmount = cart.items.reduce((count, item) => {
        return (count += item.subTotal);
      }, 0);
      cart.total = totalAmount;
      await cart.save();
      res.send(cart);
    }
    // ======================= work with foreach ==============================
    // count = 0;
    // const amount = carts.items.forEach((item) => {
    //   return (count += item.subTotal);
    // });
    // console.log(count);
    // carts.total = totalAmount;
    // await carts.save();
    // =============================================================================
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  getCart,
  createCart,
};
