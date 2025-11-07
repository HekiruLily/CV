// paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Định nghĩa các route cho thanh toán
router.post('/payments', paymentController.createPayment); 
router.get('/payments/:user_id', paymentController.getAllPayments); 
router.get('/payments/:id', paymentController.getPaymentById); 
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router; 