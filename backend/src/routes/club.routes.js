const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");

router.get('/:clubCode/introduction', clubController.getClubInfo);
router.post('/request/approve', clubController.approveClubRequest);
router.delete('/:clubId', clubController.deleteClub);
router.get('/create-club-requests', clubController.getCreateClubRequests);
router.post('/request/reject', clubController.rejectClubRequest);
router.get('/search-club-requests', clubController.searchClubRequests);


module.exports = router;
