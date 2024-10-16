import React, { useContext, useState } from 'react';
import PaymentItems from '../components/ReviewOrder/PaymentItems';
import SumPayMent from '../components/ReviewOrder/SumPayMent';
import { CartContext } from '../context/CartContext';
import '../components/ReviewOrder/ReviewOrder.css';

import { useNavigate } from 'react-router-dom';

const ReviewOrder = () => {
  const navigate = useNavigate();
  const { menuItems } = useContext(CartContext);
  const selectedItems = menuItems.filter((item) => item.selected === true);
  const [total, setTotal] = useState(0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleTotalCalculated = (totalValue) => {
    setTotal(totalValue);
  };

  const handleOrderClick = () => {
    if (total > 0) {
      navigate('/payment', { state: { total, totalQuantity } }); // Pass totalQuantity as a prop
    }
}

  return (
    <div className="review-order-box" style={{ width: '100%' }}>
      <h2><u>XEM LẠI ĐƠN HÀNG</u></h2>
      <br />
      <div className="review-order">
        <h3>Tổng sản phẩm</h3>
        <br />
        {selectedItems.map((item) => (
          <PaymentItems key={item.id} item={item} />
        ))}
      </div>
      <br />
      <SumPayMent items={menuItems} onTotalCalculated={handleTotalCalculated} />
      <button onClick={handleOrderClick}>Đặt hàng</button>
    </div>
  );
};

export default ReviewOrder;