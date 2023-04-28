const {productController} = require("../controllers");
const router = require("express").Router();

router.post("/register", productController.addProduct);
router.get("/show", productController.showProduct);
router.get("/product-detail/:id", productController.productDetails);
router.patch("/:id", productController.updateProduct);

module.exports = router;
