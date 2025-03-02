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
  ShareAltOutlined,
  CommentOutlined
} from '@ant-design/icons';
import Comments from './Comments';
import './NewsCard.css';

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
  const [expandedContent, setExpandedContent] = useState(false);
  const contentLength = content?.length || 0;
  const contentThreshold = 500; // Character threshold for showing "See more"
  const shouldTruncate = contentLength > contentThreshold;

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

  // Format content with line breaks
  const formatContent = (text) => {
    if (!text) return '';
    
    // If content should be truncated and is not expanded
    if (shouldTruncate && !expandedContent) {
      return text.substring(0, contentThreshold) + '...';
    }
    
    // Đảm bảo hiển thị đúng dấu xuống dòng
    return text;
  };

  return (
    <div className="news-card">
      <div className="news-content">
        {activity && (
          <div className="activity-tag">
            <FireOutlined /> {activity}
          </div>
        )}
        
        <div className="user-info-container">
          <div className="avatar-author-row">
            <Avatar src={process.env.REACT_APP_API_URL + avatar} />
            <div className="author-metadata">
              <h2 className="news-author">{author}</h2>
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
            </div>
          </div>
        </div>

        <div className="news-text-container">
          <div className="news-text">
            {formatContent(content)}
          </div>
          
          {shouldTruncate && (
            <div 
              className="see-more-button" 
              onClick={() => setExpandedContent(!expandedContent)}
            >
              {expandedContent ? 'Thu gọn' : 'Xem thêm'}
            </div>
          )}
        </div>

        {images && images.length > 0 && <ImageGallery images={images} />}

        {stats && (
          <>
            <div className="fb-stats-summary">
              <div className="fb-reactions-count" onClick={showReactionList}>
                {likeCount > 0 && (
                  <>
                    <div className="fb-like-icon">
                      <LikeFilled />
                    </div>
                    <span>{likeCount}</span>
                  </>
                )}
              </div>
              <div className="fb-comments-shares-count">
                {stats.comments > 0 && (
                  <span onClick={() => setShowComments(!showComments)}>
                    {stats.comments} bình luận
                  </span>
                )}
                {stats.comments > 0 && stats.shares > 0 && <span className="fb-dot">•</span>}
                {stats.shares > 0 && <span>{stats.shares} chia sẻ</span>}
              </div>
            </div>

            <div className="fb-divider"></div>

            <div className="fb-action-buttons">
              <button 
                className={`fb-action-button ${liked ? 'fb-liked' : ''}`}
                onClick={handleLikeClick}
              >
                {liked ? <LikeFilled /> : <LikeOutlined />}
                <span>Thích</span>
              </button>
              
              <button 
                className="fb-action-button"
                onClick={() => setShowComments(!showComments)}
              >
                <CommentOutlined />
                <span>Bình luận</span>
              </button>
              
              <button className="fb-action-button">
                <ShareAltOutlined />
                <span>Chia sẻ</span>
              </button>
            </div>
          </>
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