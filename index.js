const express = require("express");

const productRouter = require("./router/productRouter");
const userRouter = require("./router/userRouter");
const dotenv = require("dotenv");
const cors = require("cors");

const mongo = require("./connect");
dotenv.config();
mongo.connect();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", (req, res, next) => {
	console.log("Started");
	next();
});

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT);
