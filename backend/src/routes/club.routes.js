const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const clubNewsController = require('../controllers/club.news.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const clubMemberController = require('../controllers/clubMember.controller');
const { uploadClubAvatar, createUpload } = require('../middlewares/upload');
const newsReactionController = require('../controllers/club.news.reaction.controller');
const newsCommentController = require('../controllers/club.news.comment.controller');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);
router.post('/request', authMiddleware, uploadClubAvatar, clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);

// Routes cho quản lý thành viên
router.get('/:clubCode/members', authMiddleware, clubMemberController.getMembers);
router.patch('/members/:memberId/status', authMiddleware, clubMemberController.updateMemberStatus);

router.post('/join', authMiddleware, clubController.joinClub);
router.get('/code/:code', clubController.getClubByCode);

// Route chuyển quyền hạn cho thành viên (Chỉ Admin)
router.patch('/:clubCode/members/:memberId/role', authMiddleware, clubMemberController.updateMemberRole);

// News routes
const uploadNews = createUpload('news').single('image');

router.post('/:clubCode/news', authMiddleware, uploadNews, clubNewsController.createNews);

router.get('/:clubCode/news', authMiddleware, clubNewsController.getClubNews);

router.get('/:clubCode/news/:newsId', authMiddleware, clubNewsController.getNewsDetail);


// Comment routes
router.post('/:clubCode/news/:newsId/comments', authMiddleware, newsCommentController.createComment);
router.put('/:clubCode/news/comments/:commentId', authMiddleware, newsCommentController.updateComment);
router.delete('/:clubCode/news/comments/:commentId', authMiddleware, newsCommentController.deleteComment);
router.get('/:clubCode/news/:newsId/comments', authMiddleware, newsCommentController.getComments);

// Reaction routes
router.post('/:clubCode/news/:newsId/reactions', authMiddleware, newsReactionController.addReaction);
router.delete('/:clubCode/news/:newsId/reactions', authMiddleware, newsReactionController.removeReaction);
router.get('/:clubCode/news/:newsId/reactions', authMiddleware, newsReactionController.getReactions);
// router.get('/news/reactions/me', authMiddleware, newsReactionController.getUserReactedNews);
router.get('/:clubCode/news/:newsId/reactions/check', authMiddleware, newsReactionController.checkReaction);

module.exports = router; 