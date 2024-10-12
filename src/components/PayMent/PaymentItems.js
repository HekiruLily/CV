import React from 'react';

const PaymentItems = ({ item}) => {
  return (
    <div className='products'>
        <a href="#">
          <img 
            className='product_img' 
            src={`${process.env.PUBLIC_URL}/img/${item.image}`} 
            alt={item.name} 
          />
        </a>
      <div className='product_item'>
        <h2>{item.name}</h2>
        <div className='product_price'>
            <h4>Số lượng {item.quantity}</h4>
            <h4>{item.price} VNĐ</h4>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentItems;
