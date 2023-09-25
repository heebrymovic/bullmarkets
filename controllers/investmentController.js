const Investment = require('../models/Investment');

// Create a new investment
exports.createInvestment = async (req, res) => {
    try {
        const { name, description, minimumInvestmentAmount, interestRate, maturityDate } = req.body;

        const newInvestment = new Investment({
            name,
            description,
            minimumInvestmentAmount,
            interestRate,
            maturityDate,
        });

        await newInvestment.save();

        return res.status(201).json({ message: 'Investment created successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get all investments
exports.getAllInvestments = async (req, res) => {
    try {
        const investments = await Investment.find();

        return res.status(200).json(investments);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get investment by ID
exports.getInvestmentById = async (req, res) => {
    try {
        const investmentId = req.params.id;
        const investment = await Investment.findById(investmentId);

        if (!investment) {
            return handleError(res, 404, 'Investment not found.');
        }

        return res.status(200).json(investment);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Update investment by ID
exports.updateInvestmentById = async (req, res) => {
    try {
        const investmentId = req.params.id;
        const updatedInvestmentData = req.body;

        // Update the investment data
        const updatedInvestment = await Investment.findByIdAndUpdate(
            investmentId,
            { $set: updatedInvestmentData },
            { new: true }
        );

        if (!updatedInvestment) {
            return handleError(res, 404, 'Investment not found.');
        }

        return res.status(200).json(updatedInvestment);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Delete investment by ID
exports.deleteInvestmentById = async (req, res) => {
    try {
        const investmentId = req.params.id;

        // Delete the investment by ID
        const deletedInvestment = await Investment.findByIdAndRemove(investmentId);

        if (!deletedInvestment) {
            return handleError(res, 404, 'Investment not found.');
        }

        return res.status(200).json({ message: 'Investment deleted successfully.' });
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};


