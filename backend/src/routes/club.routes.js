const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const clubMemberController = require('../controllers/clubMember.controller');
const upload = require('../middlewares/upload');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);
router.post('/request', authMiddleware, upload.single('avatar'), clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);

// Routes cho quản lý thành viên
router.get('/:clubCode/members', authMiddleware, clubMemberController.getMembers);
router.patch('/members/:memberId/status', authMiddleware, clubMemberController.updateMemberStatus);

module.exports = router; 