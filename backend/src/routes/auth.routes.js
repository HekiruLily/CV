const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authMiddleware, authController.checkAuth);

module.exports = router;