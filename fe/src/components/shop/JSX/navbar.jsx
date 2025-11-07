import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../CSS/navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-title">
                <h1>Shop</h1>
            </div>
            <div className="navbar-links">
                <Link to="/shop-men">NAM</Link>
                <Link to="/shop-women">NỮ</Link>
                <Link to="/shop-accessories">PHỤ KIỆN</Link>
                <Link to="/shop-flag">CỜ</Link>
            </div>
            <div className="navbar-cart">
                <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;