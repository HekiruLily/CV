import React from 'react';
import { Link } from 'react-router-dom';
import women1 from './women-1.jpg';
import women2 from './women-2.jpg';
import women3 from './women-3.jpg';
import women4 from './women-4.jpg';
import women5 from './women-5.jpg';
import women6 from './women-6.jpg';
import '../CSS/shop-women.css'; 

const ShopWoman = () => {
    const products = [
        { id: 7, name: 'HAPPICON SKI LONGSLEEVE', price: '1.000.000đ', image: women1 },
        { id: 8, name: 'FOUNDATION T-SHIRT', price: '1.100.000đ', image: women2 },
        { id: 9, name: 'SUNSET SWEATSHIRT WOMEN', price: '1.200.000đ', image: women3 },
        { id: 10, name: 'ADSCENDO SWEATSHIRT WOMEN', price: '1.300.000đ', image: women4 },
        { id: 11, name: 'ICON BLOSSOM SWEATSHIRT', price: '1.400.000đ', image: women5 },
        { id: 12, name: 'GRAPHICON HOODIE', price: '1.500.000đ', image: women6 },
    ];

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    return (
        <div className="shop-container">
            <h1 className="shop-title">NỮ</h1>
            <div className="shop-items">
                {products.map(product => (
                    <div className="shop-item" key={product.id}>
                        <img src={product.image} alt={product.name} className="shop-image" />
                        <h2 className="shop-item-title">{product.name}</h2>
                        <p className="shop-item-price">{product.price}</p>
                        <button className="add-to-cart-button" onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopWoman;