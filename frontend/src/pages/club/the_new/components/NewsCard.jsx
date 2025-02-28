import React, { useState, useEffect } from 'react';
import { message, Tooltip, Modal } from 'antd';
import Avatar from './Avatar';
import ViewCount from './ViewCount';
import ImageGallery from './ImageGallery';
import ClubNewsService from '../../../../services/clubNews.service';
import { useParams } from 'react-router-dom';
import { 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  FireOutlined,
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import Comments from './Comments';

const NewsCard = ({ 
  id,
  avatar, 
  author,
  views, 
  timestamp, 
  content, 
  location, 
  images,
  activity,
  stats 
}) => {
  const { clubCode } = useParams();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats?.likes || 0);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    checkUserReaction();
  }, [clubCode, id]);

  const checkUserReaction = async () => {
    try {
      const response = await ClubNewsService.checkReaction(clubCode, id);
      setLiked(response.data.hasReacted);
    } catch (error) {
      console.error('Error checking reaction:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await ClubNewsService.removeReaction(clubCode, id);
        setLikeCount(prev => prev - 1);
      } else {
        await ClubNewsService.addReaction(clubCode, id, 'LIKE');
        setLikeCount(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      message.error('Có lỗi xảy ra khi thực hiện thao tác');
    }
  };

  const showReactionList = async () => {
    try {
      const response = await ClubNewsService.getReactions(clubCode, id);
      setReactions(response.data.reactions);
      setShowReactions(true);
    } catch (error) {
      message.error('Có lỗi xảy ra khi lấy danh sách cảm xúc');
    }
  };

  return (
    <div className="news-card">
      <div className="news-content">
        {activity && (
          <div className="activity-tag">
            <FireOutlined /> {activity}
          </div>
        )}
        
        <div className="avatar-author-row">
          <Avatar src={process.env.REACT_APP_API_URL + avatar} />
          <h2 className="news-author">{author}</h2>
        </div>

        <div className="metadata-row">
          <span className="timestamp">
            <ClockCircleOutlined className="icon" /> {timestamp}
          </span>
          {location && (
            <span className="location">
              <EnvironmentOutlined className="icon" /> {location}
            </span>
          )}
          <ViewCount count={views} />
        </div>

        <pre className="news-text">{content}</pre>

        {images && images.length > 0 && <ImageGallery images={images} />}

        {stats && (
          <div className="stats-row">
            <Tooltip title="Nhấn để thích">
              <div className="stat-item" onClick={handleLikeClick}>
                <div className="stat-label">
                  {liked ? (
                    <LikeFilled className="icon liked" />
                  ) : (
                    <LikeOutlined className="icon" />
                  )}
                  Thích
                </div>
                <div className="stat-value" onClick={showReactionList}>
                  {likeCount}
                </div>
              </div>
            </Tooltip>
            <div className="stat-item" onClick={() => setShowComments(!showComments)}>
              <div className="stat-label">
                <MessageOutlined className="icon" /> Bình luận
              </div>
              <div className="stat-value">{stats.comments}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">
                <ShareAltOutlined className="icon" /> Chia sẻ
              </div>
              <div className="stat-value">{stats.shares}</div>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Những người đã thích"
        open={showReactions}
        onCancel={() => setShowReactions(false)}
        footer={null}
      >
        <div className="reactions-list">
          {reactions.map(reaction => (
            <div key={reaction.reaction_id} className="reaction-item">
              <Avatar src={process.env.REACT_APP_API_URL + reaction.avatar} />
              <span className="reaction-user-name">{reaction.full_name}</span>
            </div>
          ))}
        </div>
      </Modal>

      {showComments && (
        <Comments clubCode={clubCode} newsId={id} />
      )}
    </div>
  );
};

export default NewsCard;