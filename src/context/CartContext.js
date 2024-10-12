import React, { createContext, useState } from "react";
import { ProductsAll } from "../Products/ProductsAll";
import CheckImg from '../assets/img/check.png';
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const addToCart = (id) => {
    const product = ProductsAll.find((product) => product.id === id);
    if (product) {
      setNotificationMessage('Sản phẩm đã được thêm vào giỏ hàng');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // 2s
    }

    setMenuItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.title,
            quantity: 1,
            selected: false,
            price: product.priceRange,
            image: product.image,
          },
        ];
      }
    });
  };

  const handleQuantityChange = (id, delta) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const handleSelectAll = (isSelected) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: isSelected }))
    );
  };

  const handleSelectItem = (id) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
 
  };

  const handleDeleteProduct = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
   
  };


  const contextValue = {
    menuItems,
    addToCart,
    handleDeleteProduct,
    handleSelectAll,
    handleQuantityChange,
    handleSelectItem,
  };
  console.log(menuItems)
  return (
    <CartContext.Provider value={contextValue}>
      {children}
      {showNotification && (
        <div className="cart_content_add">
          <img src={CheckImg} alt="Check" />
          <h2>{notificationMessage}</h2>
        </div>
      )}
    </CartContext.Provider>
  );
};
