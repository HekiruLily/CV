import React, { useContext, useEffect, useRef } from "react";
import MenuItem from "../components/ShoppingCart/MenuItem";
import "../assets/css/ShoppingCart.css";
import { CartContext } from "../context/CartContext";
import OrderSummary from "../components/ShoppingCart/OrderSummary";
import Shop from "../components/ShoppingCart/Shop";

const ShoppingCartPage = () => {
  const {
    menuItems,
    handleQuantityChange,
    handleSelectItem,
    handleDeleteProduct,
    handleSelectAll,
  } = useContext(CartContext);

  // Move the useRef hooks outside of any conditionals
  const orderSummaryRef = useRef(null); // Reference for OrderSummary
  const endOfCartRef = useRef(null); // Reference for the special div

  useEffect(() => {
    const handleScroll = () => {
      const orderSummary = orderSummaryRef.current;
      const endOfCart = endOfCartRef.current;

      if (orderSummary && endOfCart) {
        const rect = endOfCart.getBoundingClientRect(); // Get the position of `endOfCart`
        const orderSummaryHeight = orderSummary.offsetHeight;

        if (rect.top <= window.innerHeight - orderSummaryHeight) {
          // Stick to the bottom if endOfCart is in viewport
          orderSummary.style.position = "absolute";
          orderSummary.style.bottom = "0";
          orderSummary.style.left = "0";
          orderSummary.style.width = "100%";
        } else {
          // Otherwise, fix to the bottom of the viewport
          orderSummary.style.position = "fixed";
          orderSummary.style.bottom = "0";
          orderSummary.style.left = "0";
          orderSummary.style.width = "100%";
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // Listen to scroll events

    return () => window.removeEventListener("scroll", handleScroll); // Clean up event listener
  }, []);

  if (!menuItems) {
    return <p>Loading...</p>;
  }

  return (
    <div className="containerGH">
      <div className="search-icon-list">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
          alt="Cart Icon"
        />
        <h1>Giỏ Hàng</h1>
      </div>
      <div className="container_product">
        <Shop item={menuItems} />
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onSelectItem={handleSelectItem}
              onDeleteProduct={handleDeleteProduct}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {/* OrderSummary and its reference */}
        <div ref={orderSummaryRef} className="order-summary-container">
          <OrderSummary
            items={menuItems}
            onSelectAll={handleSelectAll}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>

        {/* Special div as a reference point for scrolling */}
        <div
          ref={endOfCartRef}
          id="end-of-cart"
          style={{ height: "50px", background: "#f1f1f1" }}
        />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
