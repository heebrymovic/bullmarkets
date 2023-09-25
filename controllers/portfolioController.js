const Portfolio = require('../models/Portfolio');

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
    try {
        const { user, name, description } = req.body;

        const newPortfolio = new Portfolio({
            user,
            name,
            description,
        });

        await newPortfolio.save();

        return res.status(201).json({ message: 'Portfolio created successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get all portfolios
exports.getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find();

        return res.status(200).json(portfolios);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get portfolio by ID
exports.getPortfolioById = async (req, res) => {
    try {
        const portfolioId = req.params.id;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return handleError(res, 404, 'Portfolio not found.');
        }

        return res.status(200).json(portfolio);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Update portfolio by ID
exports.updatePortfolioById = async (req, res) => {
    try {
        const portfolioId = req.params.id;
        const updatedPortfolioData = req.body;

        // Update the portfolio data
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $set: updatedPortfolioData },
            { new: true }
        );

        if (!updatedPortfolio) {
            return handleError(res, 404, 'Portfolio not found.');
        }

        return res.status(200).json(updatedPortfolio);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Delete portfolio by ID
exports.deletePortfolioById = async (req, res) => {
    try {
        const portfolioId = req.params.id;

        // Delete the portfolio by ID
        const deletedPortfolio = await Portfolio.findByIdAndRemove(portfolioId);

        if (!deletedPortfolio) {
            return handleError(res, 404, 'Portfolio not found.');
        }

        return res.status(200).json({ message: 'Portfolio deleted successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

