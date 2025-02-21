const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);
router.post('/request', authMiddleware, clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);
router.get('/requests', authMiddleware, clubController.getClubRequestsByStatus);
router.post('/requests/approve', authMiddleware, clubController.approveClubRequest);


module.exports = router; 



