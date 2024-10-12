import React from 'react';

const SumPayMent = ({ items}) => {
  const total = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div >
      <h4>Tổng thanh toán: {total} VNĐ</h4>
     
      <button className='payment' disabled={total === 0}><h3>Dat hàng</h3></button>
    </div>
  );
};

export default SumPayMent;