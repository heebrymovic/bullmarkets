const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/transactions', TransactionController.createTransaction);

// Get all transactions
router.get('/transactions', TransactionController.getAllTransactions);

// Get transaction by ID
router.get('/transactions/:id', TransactionController.getTransactionById);

// Update transaction by ID
router.put('/transactions/:id', TransactionController.updateTransactionById);

// Delete transaction by ID
router.delete('/transactions/:id', TransactionController.deleteTransactionById);


module.exports = router;
