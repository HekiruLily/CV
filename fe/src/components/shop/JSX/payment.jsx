//Trang Payment, gồm tổng số tiền cần thanh toán (được lấy từ trang cart.jsx), thông tin người mua (là địa chỉ nhà được nhập bởi người mua), phương thức thanh toán (được chọn bởi người mua)

import '../CSS/payment.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Card, Radio, Button, Input, Select, Typography, Space } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const PaymentBox = () => {
  return (
    <Card className="payment-box" style={{ width: '15%' }}>
      <img src="https://i.imgur.com/OhpNHaB.png" width="60px" alt="" />
      <span><b>Thanh toán</b></span>
    </Card>
  );
};

const OrderInformationBox = ({ totalPayment, totalQuantity, address, setAddress }) => {
  return (
    <Card className="order-information-box" style={{ width: '55%' }}>
      <Title level={2}><u>THÔNG TIN ĐƠN HÀNG</u></Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="order-information">
          <Text strong>Tổng sản phẩm</Text>
          <Input value={totalQuantity} readOnly />
        </div>
        <div className="order-information">
          <Text strong>Tổng thanh toán</Text>
          <Input value={totalPayment} readOnly />
        </div>
        <div className="order-information">
          <Text strong>Địa chỉ nhận hàng</Text>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </Space>
    </Card>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  const totalPayment = location.state?.total || 0;
  const totalQuantity = location.state?.totalQuantity || 0;

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayClick = () => {
    if (!address) {
      alert('Vui lòng nhập địa chỉ nhận hàng trước khi thanh toán.');
      return;
    }
  
    if (paymentMethod === 'transfer') {
      navigate('/transferQRcode');
    } else {
      if (paymentMethod) {
        alert('Đặt hàng thành công, vui lòng chờ vài ngày để nhận hàng');
      } else {
        alert('Vui lòng chọn phương thức thanh toán');
      }
    }
  };

  const handleContinueShoppingClick = () => {
    navigate('/shop');
  };

  return (
    <div>
      <PaymentBox />
      <OrderInformationBox 
        totalPayment={totalPayment} 
        totalQuantity={totalQuantity} 
        address={address} 
        setAddress={setAddress} 
      />
      <PaymentMethodBox handlePaymentMethodChange={handlePaymentMethodChange} />
      <div className="action-box" style={{ width: '55%' }}>
        <Button className="continue-shopping" type="primary" size="large" onClick={handleContinueShoppingClick}>Tiếp tục mua sắm</Button>
        <Button className="pay" type="primary" size="large" onClick={handlePayClick}>Thanh toán</Button>
      </div>
    </div>
  );
};

const PaymentMethodBox = ({ handlePaymentMethodChange }) => {
  return (
    <Card className="payment-method-box" style={{ width: '55%' }}>
      <Title level={2}>Phương thức thanh toán</Title>
        <Text>Mọi giao dịch đều sẽ được mã hóa, thông tin thẻ tín dụng sẽ không bao giờ được lưu lại</Text>
      <br />  
      <br />
      <Radio.Group onChange={handlePaymentMethodChange} className="payment-method-pick">
        <Space direction="vertical" size="large">
          <Radio value="credit-card">
            <img src="https://i.imgur.com/edhEHmQ.png" width="40px" alt="" />
            <span>Thanh toán bằng thẻ tín dụng</span>
          </Radio>
          <Radio value="transfer">
            <img src="https://i.imgur.com/x3HfbKT.png" width="40px" alt="" />
            <span>Thanh toán bằng chuyển khoản ngân hàng</span>
          </Radio>
          <Radio value="momo">
            <img src="https://i.imgur.com/nu2tbkh.png" width="40px" alt="" />
            <span>Thanh toán bằng Momo</span>
          </Radio>
          <Radio value="cash">
            <img src="https://i.imgur.com/DV5E44z.png" width="40px" alt="" />
            <span>Thanh toán khi nhận hàng</span>
          </Radio>
        </Space>
      </Radio.Group>
    </Card>
  );
};

PaymentMethodBox.propTypes = {
  handlePaymentMethodChange: PropTypes.func.isRequired,
};

export default Payment;