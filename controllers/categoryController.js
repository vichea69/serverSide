const Category = require("../models/Category");

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name,description } = req.body;
        const category = await Category.create({name,description});
        res.status(201).json({
            message: "Category created successfully",
            _id: category._id,
            name: category.name,
            description: category.description
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Categories fetched successfully",
            categories: categories,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
};
// Get a category by id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            message: "Category fetched successfully",
            category: category,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch category", error: error.message });
    }
};


// Update a category
const updateCategory = async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
        "message": "Category updated successfully",
        "category": updatedCategory
    });
};

// Delete a category
const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory ,getCategoryById };