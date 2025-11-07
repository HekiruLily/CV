import React, { useState } from 'react';
import img2007 from './2007-1.png';
import img2007_2 from './2007-2.jpg';
import img2007_3 from './2007-3.jpg';
import img2007_4 from './2007-4.jpg';


import '../CSS/2007.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2007 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2006 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2006');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2008 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2008');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2007 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2007'} src={img2007} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2006}>
                2006 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2008}>
                2008 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2007</b></div>
          <div className='info'>Năm thứ ba, lễ hội lần đầu tiên được tổ chức 2 ngày liên tiếp (28 và 29 tháng 7 năm 2007) và thu hút hơn 20.000 người người tham dự đến từ nhiều nước khác nhau như Hà Lan, Pháp, Vương quốc Anh, Đức,… Sân khấu chính được xuất hiện với màu sắc đơn giản, 4 màn hình led được gắn trên một bức tường đầy hệ thống ánh sáng.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/qeJOjaxCSgI" style={{ margin: '5px'}}></iframe>
          <img className={'img2007-2'} height="350px" src={img2007_2} alt="" style={{ margin: '5px'}} />
          </div>
          <div className='content2'>
            <img className={'img2007-3'} src={img2007_3} alt="" style={{ margin: '5px' }} />
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/LRPeVcrIfSQ" style={{ margin: '5px' }}></iframe>
            <img className={'img2007-4'} src={img2007_4} alt="" style={{ margin: '5px' }} />
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/Ws0zVIaU2hk" style={{ margin: '5px' }}></iframe>
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/rv3bwCgLiLs" style={{ margin: '5px' }}></iframe>
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

export default Year2007;