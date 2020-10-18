require('dotenv').config();
const express = require("express");
const app = express();
const mongoose= require('mongoose');

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = require("./route/route");
const productRoute = require('./route/product.route');
const cartRoute = require('./route/cart.route')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://lutakrystal:vanthai305@cluster0.ybwvk.mongodb.net/react-1?authSource=admin&replicaSet=atlas-2g6i4f-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true')

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

var port = 8080;

app.use("/user", router);
app.use("/products", productRoute);
app.use('/cart', cartRoute);

//app.use(csurf({ cookie: true }));

app.listen(port, function () {
  console.log("Example app listening on port" + port);
});
