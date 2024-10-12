
import React, { useContext } from 'react';
import PaymentItems from '../components/PayMent/PaymentItems';
import SumPayMent from '../components/PayMent/SumPayMent';
import { CartContext } from '../context/CartContext';


const PayMent = () => {
    const {menuItems} = useContext(CartContext)
    const selectedItems = menuItems.filter((item) => item.selected === true);
    return (
      <div className="order-information-box" style={{ width: '55%' }}>
        <h2><u>THÔNG TIN ĐƠN HÀNG</u></h2>
        <br /><br />
        
        <div className="order-information">
           
          <h3>Tổng sản phẩm</h3>

          {selectedItems.map((item) => (
            <PaymentItems 
            key={item.id}
            item={item}
            />
        ))};
          <input type="text" />
        </div>
        <br />
        <div className="order-information">

          <SumPayMent
          items={menuItems}
          />
        </div>
        </div>
)}

  export default PayMent;
