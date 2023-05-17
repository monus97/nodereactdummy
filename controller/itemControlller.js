const item = require("../models/itemModel");

const addItem = async (req, res) => {
  try {
    const { itemName, itemPrice, itemDiscription } = req.body;

    // const img = `localhost:7000/${req.file.destination}/${req.file.filename}`;
    const img = `${req.file.destination}/${req.file.filename}`;

    const createItem = new item({
      itemName,
      itemPrice,
      itemDiscription,
      images: img,
    });

    const product = await createItem.save();
    res.status(201).json({
      message: "Item added successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await item.findById(id);
    if (product) {
      res.status(201).json({
        message: "Item found",
        product,
      });
    } else {
      return res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, itemPrice, itemDiscription } = req.body;
    console.log(req.body, "===============>");
    const payload = {
      itemName,
      itemPrice,
      itemDiscription,
    };
    if (req.file) {
      const img = `${req.file.destination}/${req.file.filename}`;
      payload.images = img;
    }

    const product = await item.findByIdAndUpdate(id, payload, { new: true });
    if (!product) {
      throw new Error("something went wrong");
    }
    res.status(201).json({
      message: "product successfully updated",
      updatedProduct: product,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await item.findByIdAndDelete(id);
    if (product) {
      res.status(201).json({
        message: "Item deleted",
      });
    } else {
      return res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllItem = async (req, res) => {
  try {
    const product = await item.find({});
    if (product) {
      res.status(201).json({
        message: "all item",
        product,
      });
    } else {
      return res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const itemName = req.params.itemName;
    const query = {itemName:{$regex : itemName ,$options : "i"}}
  
    const product = await item.find(query );
    if (product) {
        res.status(200).json(
          product
        )
    }else{
      return res.status(404).json({
        message: "Item not found",
      })
    }
} catch (error) {
    res.status(400).json({
      message : error.message
    })
  } 

};

module.exports = {
  addItem,
  getItemById,
  getAllItem,
  deleteItem,
  updateItem,
  searchProduct,
};
