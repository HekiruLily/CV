import React, { useEffect, useState } from "react";
import Slider from "react-slick"; 
import TournamentService from "../../../services/tournament.service";
import { useAuth } from "../../../hooks/useAuth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.css";
import herosection from '../../../assets/img/herosection.png'; 

const Hero = () => {
  const { userData: user } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await TournamentService.getAllTournaments();
        console.log("Dữ liệu từ API:", response);
  
        if (response.success) {
          const tournaments = response.data || [];
  
          const now = new Date();
  
          // Phân loại giải đấu theo trạng thái
          const upcomingTournaments = tournaments.filter(tournament => new Date(tournament.tournament_start_date) > now);
          const ongoingTournaments = tournaments.filter(tournament => new Date(tournament.tournament_start_date) <= now && new Date(tournament.tournament_end_date) >= now);

          setUpcoming(upcomingTournaments);
          setOngoing(ongoingTournaments);
  
        } else {
          console.error("API không trả về dữ liệu hợp lệ:", response);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách giải đấu:", error);
      }
    };
  
    fetchTournaments();
  }, []);
  
  // Cấu hình slider
  const sliderSettings = {
    dots: true,
    infinite: false, 
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    rows: 1, 
  };
  
  // Hàm định dạng ngày tháng năm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <>
     <section className="hero" style={{ backgroundImage: `url(${herosection})` }} > 
        <div className="hero-content">
          {user ? (
            <>
              <h1>Chào {user.full_name}</h1>
              <p>Tham gia thử thách chạy lớn nhất thế giới với các vận động viên trên toàn cầu.</p>
              <a href="/dashboard" className="register-btn">Tham gia ngay</a>
            </>
          ) : (
            <>
              <a href="/signup" className="register-btn">Đăng ký ngay</a>
            </>
          )}
        </div>
      </section>

      {/* Hiển thị slider ở bên dưới */}
      <div className="tournament-section">
        <h2>Giải đấu sắp tới</h2>
        <Slider {...sliderSettings}>
          {upcoming.map(tournament => (
            <div key={tournament.id} className="tournament-card">
              <img src={tournament.image_url} alt={tournament.tournament_name} />
              <h3>{tournament.tournament_name}</h3> 
              <p>Thời gian: {formatDate(tournament.tournament_start_date)} - {formatDate(tournament.tournament_end_date)}</p>
              <p>Địa điểm: {tournament.tournament_location}</p>
            </div>
          ))}
        </Slider>

        <h2>Giải đấu đang diễn ra</h2>
        <Slider {...sliderSettings}>
          {ongoing.map(tournament => (
            <div key={tournament.id} className="tournament-card">
              <img src={tournament.image_url} alt={tournament.tournament_name} />
              <h3>{tournament.tournament_name}</h3> 
              <p>Thời gian: {formatDate(tournament.tournament_start_date)} - {formatDate(tournament.tournament_end_date)}</p>
              <p>Địa điểm: {tournament.tournament_location}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Hero;
