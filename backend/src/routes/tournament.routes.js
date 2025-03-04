const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");
const { createUpload } = require("../middlewares/upload");
const upload = createUpload("common"); // Middleware xử lý upload ảnh

router.get("/all-tournament", tournamentController.getAllTournaments);
router.get("/get-tournament-by-id/:id", tournamentController.getTournamentById);
router.post("/create-tournament", upload.single("image"), tournamentController.createTournament);
router.put("/update-tournament/:id", upload.single("image"), tournamentController.updateTournament);
router.delete("/delete-tournament/:id", tournamentController.deleteTournament);

module.exports = router;
