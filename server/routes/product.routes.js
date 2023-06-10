const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const Controller = require("../controllers/product.controller");

router.get("/", Controller.getProductList);

router.post("/", upload.array("image", 10), Controller.addProduct);

router.delete("/", auth, Controller.removeProduct);
router.patch("/:id", auth, upload.array("image", 10), Controller.updateProduct);

module.exports = router;
