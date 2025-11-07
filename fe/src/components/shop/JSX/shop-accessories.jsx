import React from 'react';
import '../CSS/shop-accessories.css'; // Đảm bảo bạn có file CSS để định dạng
import accessories1 from './accessories-1.jpg';
import accessories2 from './accessories-2.jpg';
import accessories3 from './accessories-3.jpg';
import accessories4 from './accessories-4.jpg';
import accessories5 from './accessories-5.jpg';
import accessories6 from './accessories-6.jpg';

const ShopAccessories = () => {
    const products = [
        { id: 1, name: 'BASEBALL CAP', price: '1.000.000đ', image: accessories1 },
        { id: 2, name: 'LOOP EXPERIENCE 2 BLACK', price: '1.100.000đ', image: accessories2 },
        { id: 3, name: 'BOTANIC PHONEBAG', price: '1.200.000đ', image: accessories3 },
        { id: 4, name: 'CARD GAME', price: '1.300.000đ', image: accessories4 },
        { id: 5, name: 'FLAG PIN', price: '1.400.000đ', image: accessories5 },
        { id: 6, name: 'VICTOR SUNGLASSES', price: '1.500.000đ', image: accessories6 },
    ];

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    return (
        <div className="shop-container">
            <h1 className="shop-title">PHỤ KIỆN</h1>
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

export default ShopAccessories;