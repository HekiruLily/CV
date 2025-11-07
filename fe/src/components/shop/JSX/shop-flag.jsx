import React from 'react';
import { Link } from 'react-router-dom';
import flag1 from './flag-1.jpg';
import '../CSS/shop-flag.css'; 

const ShopFlag = () => {
    const products = [
        { id: 13, name: 'FLAG', price: '1.075.000đ', image: flag1 },
    ];

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    return (
        <div className="shop-container">
            <h1 className="shop-title">CỜ</h1>
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
}

export default ShopFlag;