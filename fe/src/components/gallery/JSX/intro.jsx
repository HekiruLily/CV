import '../CSS/intro.css';
import introVideo from './video.mp4';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import biểu tượng mũi tên

const Intro = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleStart = () => {
    navigate('/2005'); // Chuyển hướng đến trang 2005
  };

  return (
    <div className="intro">
      <video className="intro-video" controls muted autoPlay loop>
        <source src={introVideo} type="video/mp4" />
        Lỗi khi hiện video
      </video>
      <div className="intro-text">
        <h1>Down Memory Lane</h1>
        <p>tomorrowland through the tears</p>
        <br/>
        <button className="start-button" onClick={handleStart}>
          BẮT ĐẦU <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Intro;