import React from 'react';

import './SumPayMent.css';

const SumPayMent = ({ items, onTotalCalculated }) => {

  const total = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Call the callback function with the total value
  React.useEffect(() => {
    onTotalCalculated(total);
  }, [total, onTotalCalculated]);



  return (
    <div className="container">
      <h4>Tổng thanh toán: {total} VNĐ</h4>
    </div>
  );
};
export default SumPayMent;