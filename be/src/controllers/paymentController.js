
const Payment = require('../models/paymentModel'); 
exports.createPayment = async (req, res) => {
    try {
        const { user_id, total_amount, payment_method } = req.body;
        const newPayment = await Payment.createPayment(user_id, total_amount, payment_method);
        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating payment', error: error.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const payments = await Payment.getAllPayments(userId);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.getPaymentById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment', error: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { total_amount, payment_method } = req.body;
        const updated = await Payment.updatePayment(paymentId, total_amount, payment_method);
        if (!updated) {
            return res.status(404).json({ message: 'Payment not found or not updated' });
        }
        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error updating payment', error: error.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const deleted = await Payment.deletePayment(paymentId);
        if (!deleted) {
            return res.status(404).json({ message: 'Payment not found or not deleted' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
};