const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/portfolioController');

// Create a new portfolio
router.post('/portfolios', PortfolioController.createPortfolio);

// Get all portfolios
router.get('/portfolios', PortfolioController.getAllPortfolios);

// Get portfolio by ID
router.get('/portfolios/:id', PortfolioController.getPortfolioById);

// Update portfolio by ID
router.put('/portfolios/:id', PortfolioController.updatePortfolioById);

// Delete portfolio by ID
router.delete('/portfolios/:id', PortfolioController.deletePortfolioById);


module.exports = router;
