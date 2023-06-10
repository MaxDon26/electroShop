const express = require("express");
const router = express.Router({ mergeParams: true });

const Controller = require("../controllers/product.controller");

router.get("/", Controller.getProductList);

router.post("/", Controller.addProduct);

router.delete("/:id", Controller.removeProduct);

module.exports = router;
