import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/shop.css';
import imgMen from './men.jpg';
import imgWomen from './women.jpg';
import imgAccessories from './accessories.jpg';
import imgFlag from './flag.jpg';

const Shop = () => {
    return (
        <div className="shop-container">
            <h1 className="shop-title">CHÀO MỪNG ĐẾN VỚI SHOP</h1>
            <h2 className="shop-subtitle">Hãy bắt đầu bằng cách chọn 1 danh mục sau</h2>
            <div className="shop-items">
                <div className="shop-item">
                    <Link to="/shop-men">
                        <img src={imgMen} alt="Men" className="shop-image" />
                    </Link>
                    <p className="shop-item-title">NAM</p>
                </div>
                <div className="shop-item">
                    <Link to="/shop-women">
                        <img src={imgWomen} alt="Women" className="shop-image" />
                    </Link>
                    <p className="shop-item-title">NỮ</p>
                </div>
                <div className="shop-item">
                    <Link to="/shop-accessories">
                        <img src={imgAccessories} alt="Accessories" className="shop-image" />
                    </Link>
                    <p className="shop-item-title">PHỤ KIỆN</p>
                </div>
                <div className="shop-item">
                    <Link to="/shop-flag">
                        <img src={imgFlag} alt="Flag" className="shop-image" />
                    </Link>
                    <p className="shop-item-title">CỜ</p>
                </div>
            </div>
        </div>
    );
}

export default Shop;