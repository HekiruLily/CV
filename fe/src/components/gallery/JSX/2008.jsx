import React, { useState } from 'react';
import img2008 from './2008-1.jpg';
import img2008_2 from './2008-2.jpg';
import img2008_3 from './2008-3.jpg';


import '../CSS/2008.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2006 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2007 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2007');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2009 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2009');
    }, 300); // Thời gian trượt
  };


  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2008 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2008'} src={img2008} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2007}>
                2007 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2009}>
                2009 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2008</b></div>
          <div className='info'>Lễ hội được tổ chức trong 2 ngày 26-27/7/2008, đó có lẽ là một năm đột phá khi số lượng người mua vé lên đến hơn 50.000 người. Thật bất ngờ khi sân khấu chính của Tomorrowland năm ấy đã tạo nên một nhân vật đặc biệt, một chú rùa khổng lồ như đang lao về phía bàn DJ cùng hệ thống phun nước tuyệt đẹp.</div>
          <div className='content1'>
          <img className={'img2008-2'} src={img2008_2} height="350px" width= "40%" alt="" style={{ margin: '15px' }} />
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/FHiNomOfXHE"></iframe>

          </div>
          <div className='content2'>
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/wM49AwCGefY" style={{ margin: '5px' }}></iframe>
            <img className={'img2008-3'} src={img2008_3} alt="" style={{ margin: '5px' }} />
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/ngNfU69Jln4" style={{ margin: '5px' }} ></iframe>

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

export default Year2006;