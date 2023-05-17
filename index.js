const express = require("express");
const multer = require("multer");
const app = express();
require("dotenv").config();
require("./models/config");
const itemRouter = require("./router/itemRouter");
const UserRouter = require("./router/userRoutes");
const mongoSanitize = require('express-mongo-sanitize')

const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/assets/images", express.static("public/assets/images"));

app.use(mongoSanitize())
app.use("/", itemRouter);
app.use("/", UserRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
