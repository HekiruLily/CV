// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart', cartController.createCartItem); 
router.get('/cart/:user_id', cartController.getAllCartItems); 
router.put('/cart/:id', cartController.updateCartItem); 
router.delete('/cart/:id', cartController.deleteCartItem); 
module.exports = router; 