const express = require("express");
const router = express.Router({ mergeParams: true });

const categoryRoute = require("./category.routes");
const vendorRoute = require("./vendor.routes");
const productRoute = require("./product.routes");
const authRoute = require("./auth.routes");

router.use("/category", categoryRoute);
router.use("/vendor", vendorRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);

module.exports = router;
