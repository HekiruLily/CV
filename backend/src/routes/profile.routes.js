const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const runningRecordController = require('../controllers/runningRecord.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload')

// Profile routes
router.get('/me', authMiddleware, profileController.getUserProfile);
router.patch('/me', authMiddleware, profileController.updateProfile);
router.patch('/me/avatar', authMiddleware, upload.single('avatar'), profileController.updateAvatar);

// Running records routes
router.post('/records', authMiddleware, runningRecordController.createRecord);
router.patch('/records/:recordId', authMiddleware, runningRecordController.updateRecord);
router.delete('/records/:recordId', authMiddleware, runningRecordController.deleteRecord);

module.exports = router; 