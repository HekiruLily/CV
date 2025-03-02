const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");

router.get("/all-tournament", tournamentController.getAllTournaments);
router.get("/get-tournament-by-id/:id", tournamentController.getTournamentById);
router.post("/create-tournament", tournamentController.createTournament);
router.put("/update-tournament/:id", tournamentController.updateTournament);
router.delete("/delete-tournament/:id", tournamentController.deleteTournament);

module.exports = router;
