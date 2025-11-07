
const Cart = require('../models/cartModel'); // Import mô hình giỏ hàng

exports.createCartItem = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        // Kiểm tra xem các trường có hợp lệ không
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
        }

        const newCartItem = await Cart.createCartItem(user_id, product_id, quantity);
        res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
    } catch (error) {
        res.status(400).json({ message: 'Error creating cart item', error: error.message });
    }
};

exports.getAllCartItems = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const cartItems = await Cart.getAllCartItems(userId);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;
        const updated = await Cart.updateCartItem(cartItemId, quantity);
        if (!updated) {
            return res.status(404).json({ message: 'Cart item not found or not updated' });
        }
        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating cart item', error: error.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const deleted = await Cart.deleteCartItem(cartItemId);
        if (!deleted) {
            return res.status(404).json({ message: 'Cart item not found or not deleted' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart item', error: error.message });
    }
};