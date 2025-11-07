import React, { useState } from 'react';
import img2005 from './2005-1.jpg';
import img2005_2 from './2005-2.jpg';
import img2005_3 from './2005-3.jpg';
import '../CSS/2005.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2005 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoToIntro = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2006 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2006');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
      navigate('/login');
  };

  return (
    <div className={`background2005 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2005'} src={img2005} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoToIntro}>
                Intro <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2006}>
                2006 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2005</b></div>
          <div className='info'>Tomorrowland được tổ chức lần đầu tiên vào ngày 14/8/2005 tại thị trấn Boom, nước Bỉ bởi ID&T, từ ý tưởng do anh em Manu và Michiel Beers hình thành – đây được xem là cột mốc nhiệm màu trong lịch sử, một thương hiệu mới được ra đời.</div>
          <div className='content1'>
            <iframe width="40%" height="350px" src="https://www.youtube.com/embed/w37K5flPvFM"></iframe>
            <div className='info2'>Lúc ấy có khoảng 10000 người tham dự, sân khấu chính được xuất hiện với thiết kế vô cùng đơn giản nhưng điều đặc biệt chính là khởi đầu của những câu chuyện thần tiên sau này. Những nghệ sĩ biểu diễn bao gồm Push (MIKE), Armin van Buuren, Marino Sagaert, Cor Fijneman, Yves Deruyter, Technoboy, Yoji Biomehanika, Coone....</div>
          </div>
          <div className='content2'>
            <img className={'img2005-2'} src={img2005_2} alt="" />
            <iframe width="40%" height="250px" src="https://www.youtube.com/embed/2BZPgTXBpIs"></iframe>
            <img className={'img2005-3'} src={img2005_3} alt="" />
          </div>
          <div className='button'>
             <button onClick={handleGoToShop}>
                Bạn muốn mua một vài món đồ lưu niệm? ĐẾN SHOP NGAY! <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Year2005;