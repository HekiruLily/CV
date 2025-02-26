const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controllers');

router.get('/:clubCode/introduction', clubController.getClubInfo);
router.post('/request/approve', clubController.approveClubRequest);
router.delete('/:clubId', clubController.deleteClub);
router.get('/create-club-requests', clubController.getCreateClubRequests);
router.post('/request/reject', clubController.rejectClubRequest);

module.exports = router; 



