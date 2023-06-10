const express = require("express");
const router = express.Router({ mergeParams: true });

const categoryRoute = require("./category.routes");
const vendorRoute = require("./vendor.routes");
const productRoute = require("./product.routes");

router.use("/category", categoryRoute);
router.use("/vendor", vendorRoute);
router.use("/products", productRoute);

module.exports = router;
