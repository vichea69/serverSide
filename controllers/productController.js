const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required (name, description, price, category)" });
        }

        // Validate image
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const image = req.file.path;

        // Create the product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
        });

        // Return product with the generated _id
        res.status(201).json({
            message: "Product created successfully",
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image: product.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find().populate("category", "name description");
    res.status(200).json({
        "message": "Products fetched successfully",
        "products": products
    });
};
// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product by ID and populate its category
        const product = await Product.findById(id).populate("category", "name description");

        // If product is not found, return 404
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return the product details
        res.status(200).json({
            message: "Product fetched successfully",
            product: product,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const updates = req.body;
    if (req.file) updates.image = req.file.path;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({
        "message": "Product updated successfully",
        "product": product
    });
};

// Delete a product
const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct ,getProductById};