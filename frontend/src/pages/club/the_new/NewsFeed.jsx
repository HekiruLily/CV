import React from 'react';
import NewsCard from './components/NewsCard';
import './NewsFeed.css';

const newsData = [
  {
    id: 1,
    avatar: "https://storage.googleapis.com/a1aa/image/yGpLR6p499JJeF0gJscSYmDHwJaOaAG1mKbDyF06j2E.jpg",
    title: "Kỷ lục mới! Hoàn thành 10km trong 45 phút",
    views: 245,
    timestamp: "2 giờ trước",
    activity: "Chạy bộ buổi sáng",
    content: "Một buổi sáng tuyệt vời với thành tích mới! Cảm ơn tất cả các thành viên đã cùng nhau nỗ lực và đạt được mục tiêu. Điều kiện thời tiết thật lý tưởng và tinh thần đồng đội tuyệt vời.",
    location: "Công viên Thống Nhất",
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=500&q=80"
    ],
    stats: {
      likes: 89,
      comments: 23,
      shares: 12
    }
  },
  {
    id: 2,
    avatar: "https://storage.googleapis.com/a1aa/image/yGpLR6p499JJeF0gJscSYmDHwJaOaAG1mKbDyF06j2E.jpg",
    title: "Thông báo lịch tập Marathon Hà Nội 2024",
    views: 182,
    timestamp: "1 ngày trước",
    activity: "Thông báo quan trọng",
    content: "Chuẩn bị cho Marathon Hà Nội 2024, CLB chúng ta sẽ có lịch tập đặc biệt vào mỗi sáng thứ 7, bắt đầu từ 5h30. Hãy chuẩn bị tinh thần và thể lực thật tốt!",
    stats: {
      likes: 156,
      comments: 45,
      shares: 28
    }
  },
  {
    id: 3,
    avatar: "https://storage.googleapis.com/a1aa/image/yGpLR6p499JJeF0gJscSYmDHwJaOaAG1mKbDyF06j2E.jpg",
    title: "Chia sẻ kinh nghiệm chọn giày chạy bộ",
    views: 328,
    timestamp: "2 ngày trước",
    activity: "Chia sẻ kinh nghiệm",
    content: "Tổng hợp những kinh nghiệm quý báu về cách chọn giày chạy bộ phù hợp. Từ form dáng, đệm giày cho đến các thương hiệu uy tín trên thị trường.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
    ],
    stats: {
      likes: 245,
      comments: 56,
      shares: 89
    }
  }
];

const NewsFeed = () => {
  return (
    <div className="page-body">
      <div className="container">
        <h1 className="page-title">Tin tức & Hoạt động</h1>
        {newsData.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;