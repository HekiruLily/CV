const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/request', authMiddleware, clubController.createClubRequest);
router.get('/:clubCode/introduction', authMiddleware, clubController.getClubInfo);
router.get('/requests', authMiddleware, clubController.getClubRequestsByStatus);
router.post('/requests/approve', authMiddleware, clubController.approveClubRequest);
router.delete('/:clubId', authMiddleware, clubController.deleteClub);

module.exports = router; 



