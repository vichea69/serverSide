const express = require("express");
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.route("/").post(upload.single("image"), createProduct).get(getProducts);
router
    .route("/:id")
    .put(upload.single("image"), updateProduct)
    .delete(deleteProduct)
    .get(getProductById);

module.exports = router;
