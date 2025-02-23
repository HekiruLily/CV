const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', tournamentController.getAllTournaments);
router.get('/:tournamentId', tournamentController.getTournamentById);
router.get('/:tournamentId/years', tournamentController.getTournamentYears);

// Protected routes (cần đăng nhập)
router.post('/', authMiddleware, tournamentController.createTournament);
router.patch('/:tournamentId', authMiddleware, tournamentController.updateTournament);
router.delete('/:tournamentId', authMiddleware, tournamentController.deleteTournament);

module.exports = router; 