import React from 'react';
import { Link } from 'react-router-dom';
import men1 from './men-1.jpg';
import men2 from './men-2.jpg';
import men3 from './men-3.jpg';
import men4 from './men-4.jpg';
import men5 from './men-5.jpg';
import men6 from './men-6.jpg';
import '../CSS/shop-men.css'; 
import axios from 'axios'; // Import axios

const ShopMen = () => {
    const products = [
        { id: 1, name: 'BUTTERFLY PADDED JACKET', price: '1.100.000đ', image: men1 },
        { id: 2, name: 'SUNSET T-SHIRT', price: '1.200.000đ', image: men2 },
        { id: 3, name: 'UNITY ZIP HODDIE    ', price: '1.300.000đ', image: men3 },
        { id: 4, name: 'GRAPHICON SWEATSHIRT', price: '1.400.000đ', image: men4 },
        { id: 5, name: 'GRAPHICON SHORT', price: '1.500.000đ', image: men5 },
        { id: 6, name: 'UNITY T-SHIRT', price: '1.600.000đ', image: men6 },
    ];

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    return (
        <div className="shop-container">
            <h1 className="shop-title">NAM</h1>
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

export default ShopMen;