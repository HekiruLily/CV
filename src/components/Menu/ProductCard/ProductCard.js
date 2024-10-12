import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { CartContext } from "../../../context/CartContext";


function ProductCard(props) {
  const { id, priceRange, title, image } = props.data;
  const { addToCart} = useContext(CartContext);
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img
          src={process.env.PUBLIC_URL + `/img/${image}`}
          alt={title}
          className="product-image"
        />
      </Link>
      <h3>{title}</h3>
      <p>{priceRange}</p>
      <div className="button-group">
      <button onClick={() => addToCart(id)} className="cart-button">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/shopping-cart.png"
          alt="Cart Icon"
          className="cart-icon"
        />
        </button>
        {/* <button onClick={() => onPayMent(id)} className="buy-button">
          Mua ngay
        </button> */}
        
      </div>
    </div>
  );
}

export default ProductCard;

