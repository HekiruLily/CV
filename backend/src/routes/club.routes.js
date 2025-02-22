const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const clubMemberController = require('../controllers/clubMember.controller');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);
router.post('/request', authMiddleware, clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);
router.get('/requests', authMiddleware, clubController.getClubRequestsByStatus);
router.post('/requests/approve', authMiddleware, clubController.approveClubRequest);
router.put('/update/:club_id', authMiddleware, clubController.updateClubInfo);
// Routes cho quản lý thành viên
router.get('/:clubCode/members', authMiddleware, clubMemberController.getMembers);
router.patch('/members/:memberId/status', authMiddleware, clubMemberController.updateMemberStatus);


module.exports = router; 

