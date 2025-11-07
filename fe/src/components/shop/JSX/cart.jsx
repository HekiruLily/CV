import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/cart.css'; 

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        calculateTotals(storedCartItems);
    }, []);

    const calculateTotals = (items) => {
        let quantity = 0;
        let price = 0;

        items.forEach(item => {
            quantity += 1; 
            price += parseFloat(item.price.replace('đ', '').replace('.', '').trim()) * 1000; 
        });

        setTotalQuantity(quantity);
        setTotalPrice(price);
    };

    const handleCheckout = () => {
        
        navigate('/payment', { state: { total: totalPrice, totalQuantity } });
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        calculateTotals(updatedCartItems); 
    };

    const handleContinueShopping = () => {
        navigate('/shop'); 
    };

    return (
        <div className="cart-container">
            <h1>Giỏ Hàng</h1>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div>
                    <h2>Tổng sản phẩm: {totalQuantity}</h2>
                    <h2>Tổng tiền: {totalPrice.toLocaleString('vi-VN')}đ</h2>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <h3 className="cart-item-title">{item.name}</h3>
                                <p className="cart-item-price">{item.price}</p>
                                <button className="remove-button" onClick={() => handleRemoveItem(index)}>Xóa</button>
                            </div>
                        ))}
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
                    <button className="continue-shopping-button" onClick={handleContinueShopping}>Tiếp tục mua hàng</button>
                </div>
            )}
        </div>
    );
};

export default Cart;