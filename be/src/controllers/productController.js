
const Product = require('../models/productModel'); // Import mô hình sản phẩm

exports.createProduct = async (req, res) => {
    try {
        const { name, price, image, category } = req.body;
        const newProduct = await Product.createProduct(name, price, image, category);
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, image, category } = req.body;
        const updated = await Product.updateProduct(productId, name, price, image, category);
        if (!updated) {
            return res.status(404).json({ message: 'Product not found or not updated' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deleted = await Product.deleteProduct(productId);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found or not deleted' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};