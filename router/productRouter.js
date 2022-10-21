const express = require("express");

const productRouter = express.Router();

const products = require("../modules/productModule");

productRouter.get("/get", products.getProducts);
productRouter.post("/create", products.createProducts);
productRouter.put("/update", products.updateProducts);
productRouter.delete("/delete", products.deleteProducts);

module.exports = productRouter;
