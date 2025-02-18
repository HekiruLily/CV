const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/user-clubs', authMiddleware, clubController.getUserClubs);

module.exports = router; 