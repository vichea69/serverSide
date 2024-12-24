const express = require("express");
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryById,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(createCategory).get(getCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory).get(getCategoryById);

module.exports = router;