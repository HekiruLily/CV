import './Payment.css'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Component PaymentBox
const PaymentBox = () => {        
    return (
      <div className="payment-box" style={{ width: '15%' }}>
        <img src="https://i.imgur.com/OhpNHaB.png" width="60px" alt="" />
        <span><b>Thanh toán</b></span>
      </div>
    );
  };
  
  // Component OrderInformationBox
const OrderInformationBox = ({ totalPayment, totalQuantity }) => {
    return (
      <div className="order-information-box" style={{ width: '55%' }}>
        <h2><u>THÔNG TIN ĐƠN HÀNG</u></h2>
        <br /><br />
        <div className="order-information">
          <h3>Tổng sản phẩm</h3>
          <input type="text" value={totalQuantity} readOnly />
        </div>
        <br />
        <div className="order-information">
          <h3>Tổng thanh toán</h3>
          <input type="text" value={totalPayment} readOnly />
        </div>
        <br />
        <div className="order-information">
          <h3>Hình thức phục vụ</h3>
          <select>
            <option value="">Chọn hình thức</option>
            <option value="counter">Tại quầy</option>
            <option value="delivery">Giao tại nhà</option>
          </select>
        </div>
        <br /><br />
      </div>
    );
  };
  


// Main App Component
const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('');


    const totalPayment = location.state?.total || 0;
    const totalQuantity = location.state?.totalQuantity || 0;
    
    const handlePaymentMethodChange = (event) => {
      setPaymentMethod(event.target.value);
    };
  
    const handlePayClick = () => {
      if (paymentMethod === 'transfer') {
        navigate('/transferQRcode'); // Thay đổi đường dẫn điều hướng
      }
      else {
        if (paymentMethod){
          alert('Đặt hàng thành công, vui lòng đến quầy giao dịch để thanh toán và nhận hàng');
        }
        else {
          alert('Vui lòng chọn phương thức thanh toán');
        }
      }
    };
  
    return (
      <div>
        <PaymentBox />
        <OrderInformationBox totalPayment={totalPayment} totalQuantity={totalQuantity} />
        <PaymentMethodBox handlePaymentMethodChange={handlePaymentMethodChange} />
        <div className="action-box" style={{ width: '55%' }}>
          <button className="continue-shopping"><h3>Tiếp tục mua sắm</h3></button>
          <button className="pay" onClick={handlePayClick}><h3>Thanh toán</h3></button>
        </div>
      </div>
    );
  };
  
  // Component PaymentMethodBox



  const PaymentMethodBox = ({ handlePaymentMethodChange }) => {
    return (
      <div className="payment-method-box" style={{ width: '55%' }}>
        <h2>Phương thức thanh toán</h2>
        <h4>Mọi giao dịch đều sẽ được mã hóa </h4>
        <h4>Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại</h4>
        <br />
        <div className="payment-method-pick">
          <div className="abc">
            <input type="radio" id="credit-card" name="payment-method-pick" value="credit-card" onChange={handlePaymentMethodChange} />
            <label htmlFor="credit-card">
              <img src="https://i.imgur.com/edhEHmQ.png" width="40px" alt="" />
              <span><h4>&nbsp; Thanh toán bằng thẻ tín dụng</h4></span>
            </label>
          </div>
  
          <br /><br />
  
          <div className="abc">
            <input type="radio" id="transfer" name="payment-method-pick" value="transfer" onChange={handlePaymentMethodChange} />
            <label htmlFor="transfer">
              <img src="https://i.imgur.com/x3HfbKT.png" width="40px" alt="" />
              <span><h4>&nbsp; Thanh toán bằng chuyển khoản ngân hàng</h4></span>
            </label>
          </div>
  
          <br /><br />
  
          <div className="abc">
            <input type="radio" id="momo" name="payment-method-pick" value="momo" onChange={handlePaymentMethodChange} />
            <label htmlFor="momo">
              <img src="https://i.imgur.com/nu2tbkh.png" width="40px" alt="" />
              <span><h4>&nbsp; Thanh toán bằng Momo</h4></span>
            </label>
          </div>
  
          <br /><br />
  
          <div className="abc">
            <input type="radio" id="cash" name="payment-method-pick" value="cash" onChange={handlePaymentMethodChange} />
            <label htmlFor="cash">
              <img src="https://i.imgur.com/DV5E44z.png" width="40px" alt="" />
              <span><h4>&nbsp; Thanh toán khi nhận hàng</h4></span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  PaymentMethodBox.propTypes = {
    handlePaymentMethodChange: PropTypes.func.isRequired,
  };

  export default Payment;