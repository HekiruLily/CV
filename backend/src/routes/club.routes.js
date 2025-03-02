const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");

router.get("/", tournamentController.getAllTournaments);
router.get("/:tournamentId", tournamentController.getTournamentById);
router.get("/:tournamentId/years", tournamentController.getTournamentYears);

router.post("/", tournamentController.createTournament);
router.put("/:tournamentId", tournamentController.updateTournament);
router.delete("/:tournamentId", tournamentController.deleteTournament);

module.exports = router;
