const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controllers');


router.get('/club-id/:request_id', clubController.getClubIdFromRequest);
router.get('/:clubCode/introduction', clubController.getClubInfo);
router.post('/request/approve', clubController.approveClubRequest);
router.delete('/:clubId', clubController.deleteClub);
router.get('/create-club-requests', clubController.getCreateClubRequests);
router.post('/request/reject', clubController.rejectClubRequest);
router.get('/search-club-requests', clubController.searchClubRequests);
router.delete('/request/:request_id', clubController.deleteClubRequest);



module.exports = router;



