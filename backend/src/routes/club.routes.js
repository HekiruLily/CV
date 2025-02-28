const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const clubNewsController = require('../controllers/club.news.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const clubMemberController = require('../controllers/clubMember.controller');
const { uploadClubAvatar, createUpload } = require('../middlewares/upload');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);
router.post('/request', authMiddleware, uploadClubAvatar, clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);
router.get('/requests', authMiddleware, clubController.getClubRequestsByStatus);
router.post('/requests/approve', authMiddleware, clubController.approveClubRequest);
router.patch('/update/:club_id', authMiddleware, clubController.updateClubInfo);
const uploadNews = createUpload('news').single('image');

// Routes cho quản lý thành viên
router.get('/:clubCode/members', authMiddleware, clubMemberController.getMembers);
router.patch('/members/:memberId/status', authMiddleware, clubMemberController.updateMemberStatus);

router.post('/join', authMiddleware, clubController.joinClub);
router.get('/code/:code', clubController.getClubByCode);

// Route chuyển quyền hạn cho thành viên (Chỉ Admin)
router.patch('/:clubCode/members/:memberId/role', authMiddleware, clubMemberController.updateMemberRole);

// Route cập nhật mã thành viên
router.put('/update-member-code/:memberId', authMiddleware, clubMemberController.updateMemberCode);

router.post('/:clubCode/news', authMiddleware, uploadNews, clubNewsController.createNews);

router.get('/:clubCode/news', authMiddleware, clubNewsController.getClubNews);

router.get('/:clubCode/news/:newsId', authMiddleware, clubNewsController.getNewsDetail);

module.exports = router; 

