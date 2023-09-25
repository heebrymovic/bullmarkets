const express = require('express');
const router = express.Router();
const InvestmentController = require('../controllers/investmentController');

// Create a new investment
router.post('/investments', InvestmentController.createInvestment);

// Get all investments
router.get('/investments', InvestmentController.getAllInvestments);

// Get investment by ID
router.get('/investments/:id', InvestmentController.getInvestmentById);

// Update investment by ID
router.put('/investments/:id', InvestmentController.updateInvestmentById);

// Delete investment by ID
router.delete('/investments/:id', InvestmentController.deleteInvestmentById);


module.exports = router;
