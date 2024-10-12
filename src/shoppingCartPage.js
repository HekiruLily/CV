import React, { useState, useEffect, useRef } from "react";
import MenuItem from "../components/ShoppingCart/MenuItem";
import OrderSummary from "../components/ShoppingCart/OrderSummary";
import "../assets/css/ShoppingCart.css";
import Shop from "../components/ShoppingCart/Shop";

const ShoppingCartPage = ( ) => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Bánh mì xúc xích",
      title: "1 xúc xích",
      price: 15000,
      quantity: 1,
      selected: false,
      image: "bmxx.png",
    },
    {
      id: 2,
      name: "Trà chanh",
      title: "1 trà chanh",
      price: 15000,
      quantity: 1,
      selected: false,
      image: "bmxx.png",
    },
    {
      id: 3,
      name: "Xúc xích rán",
      title: "1 xúc xích",
      price: 10000,
      quantity: 1,
      selected: false,
      image: '',
    },
  ]);
    setMenuItems(cartItems, ...menuItems)
    
  // tạo chức năng cuộn cho mục thanh toán
  const orderSummaryRef = useRef(null); // Tham chiếu đến OrderSummary
  const endOfCartRef = useRef(null); // Tham chiếu đến div đặc biệt

  useEffect(() => {
    const handleScroll = () => {
      const orderSummary = orderSummaryRef.current;
      const endOfCart = endOfCartRef.current;

      if (orderSummary && endOfCart) {
        const rect = endOfCart.getBoundingClientRect(); // Lấy vị trí của `endOfCart`
        const orderSummaryHeight = orderSummary.offsetHeight;

        if (rect.top <= window.innerHeight - orderSummaryHeight) {
          // Nếu endOfCart nằm trong viewport thì dính vào cuối body
          orderSummary.style.position = "absolute";
          orderSummary.style.bottom = "0";
          orderSummary.style.left = "0";
          orderSummary.style.width = "100%";
        } else {
          // Nếu không thì vẫn dính vào cuối của viewport
          orderSummary.style.position = "fixed";
          orderSummary.style.bottom = "0";
          orderSummary.style.left = "0";// them de dc toan bo chieu dai
          orderSummary.style.width = "100%";
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn trang

    return () => window.removeEventListener("scroll", handleScroll); // Hủy sự kiện khi component bị tháo gỡ
  }, []);
  /* */
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
// thêm hình ảnh giỏ hàn và tên shop - kèm có component là Shop.js
  return (
    <div className="containerGH"> 
        <div className="search-icon-list">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
            alt="Cart Icon" />
          <h1>Giỏ Hàng</h1>
        </div>
        <div className='container_product'>
          <Shop item={menuItems}></Shop>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onSelectItem={handleSelectItem}
          onDeleteProduct={handleDeleteProduct}
        />
      ))}
      {/* OrderSummary và tham chiếu ref */}
      <div ref={orderSummaryRef} className="order-summary-container">
        <OrderSummary
          items={menuItems}
          onSelectAll={handleSelectAll}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>

      {/* Thêm thẻ div làm điểm neo cho order-summary */}
      <div
        ref={endOfCartRef}
        id="end-of-cart"
        style={{ height: "50px", background: "#f1f1f1" }}
      >
        {/* Đặt chiều cao để dễ kiểm tra */}
      </div>
    </div>
    </div>
  );
};

export default ShoppingCartPage;
