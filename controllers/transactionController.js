const Transaction = require('../models/Transaction');

// Error handling function
const handleError = (res, statusCode, message) => {
    console.error(message);
    return res.status(statusCode).json({ message });
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { user, amount, description, transactionId, paymentMethod, transactionType, transactionStatus } = req.body;

        // Validate required fields
        if (!user || !amount || !transactionType || !transactionStatus) {
            return handleError(res, 400, 'User, amount, transactionType, and transactionStatus are required.');
        }

        // Validate that the amount is non-negative
        if (amount < 0) {
            return handleError(res, 400, 'Amount must be non-negative.');
        }

        // Create the transaction
        const newTransaction = new Transaction({
            user,
            amount,
            description,
            transactionId,
            paymentMethod,
            transactionType,
            transactionStatus,
        });

        await newTransaction.save();

        return res.status(201).json({ message: 'Transaction created successfully.' });
    } catch (error) {
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get a list of all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    } catch (error) {
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return handleError(res, 404, 'Transaction not found.');
        }

        return res.status(200).json(transaction);
    } catch (error) {
        return handleError(res, 500, 'Internal server error.');
    }
};

// Update transaction by ID
exports.updateTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const updatedTransactionData = req.body;

        // Update the transaction data
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { $set: updatedTransactionData },
            { new: true }
        );

        if (!updatedTransaction) {
            return handleError(res, 404, 'Transaction not found.');
        }

        return res.status(200).json(updatedTransaction);
    } catch (error) {
        return handleError(res, 500, 'Internal server error.');
    }
};

// Delete transaction by ID
exports.deleteTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;

        // Delete the transaction by ID
        const deletedTransaction = await Transaction.findByIdAndRemove(transactionId);

        if (!deletedTransaction) {
            return handleError(res, 404, 'Transaction not found.');
        }

        return res.status(200).json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
        return handleError(res, 500, 'Internal server error.');
    }
};
