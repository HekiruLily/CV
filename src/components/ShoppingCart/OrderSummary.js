import React from 'react';
import { useNavigate } from 'react-router-dom';
const OrderSummary = ({ items, onSelectAll, onDeleteProduct }) => {
  const total = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const allSelected = items.length > 0 && items.every(item => item.selected);
  const navigate = useNavigate();
  const handlePayment = () => {
  navigate('/payment');
};
  
  return (
    <div className='order-summary' >
      <label>
        <input 
          type="checkbox" 
          checked={allSelected} 
          onChange={(e) => onSelectAll(e.target.checked)} 
        />
        <h4>Chọn Tất cả ({items.length})</h4>
      </label>
      <div >
        <button 
            className="delete-btn" 
            onClick={() => items.forEach(item => item.selected && onDeleteProduct(item.id))}
        >
            Xóa
        </button>
        </div>
      <h4>Tổng thanh toán: {total} VNĐ</h4>
     
      <button className='payment' onClick={handlePayment} disabled={total === 0}><h3>Mua hàng</h3></button>
    </div>
  );
};

export default OrderSummary;