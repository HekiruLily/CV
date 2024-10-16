
import { useNavigate } from 'react-router-dom';
import './TransferQRCode.css'

const TransferQrCode = () => {
  const navigate = useNavigate();

  return (
    <div className='transfer-box'>
      <br></br>
      <h1>Quét mã để chuyển khoản</h1>
      <br></br>
      <h2>Sau khi chuyển khoản thành công, vui lòng đưa màn hình chuyển khoản cho nhân viên chụp lại và nhận hàng</h2>
      <img className='QR' src="https://i.imgur.com/Yx3K9Qf.png" width="300px" alt="" />
      <h2>Số tài khoản: 1234 5678 2234 5678</h2>
      <h2>Chủ tài khoản: RIPT FOOD ORDER</h2>
      <h2>Ngân hàng: Mờ Bê Banh - Chi nhánh Hoàng Quốc Việt</h2>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default TransferQrCode;