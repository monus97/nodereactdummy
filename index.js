const express = require("express");
const multer = require("multer");
const app = express();
require("dotenv").config();
require("./models/config");

const UserRouter = require("./router/userRoutes");
const itemRouter = require("./router/itemRouter");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/assets/images", express.static("public/assets/images"));
app.use("/", UserRouter);
app.use("/", itemRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
