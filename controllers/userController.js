const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Error handling function
const handleError = (res, statusCode, message) => {
    console.error(message);
    return res.status(statusCode).json({ message });
};

// Handle user registration for local (email/password) sign-up
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return handleError(res, 400, 'Email is already registered.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.log(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Handle user login for local (email/password) sign-in
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return handleError(res, 500, 'Internal server error.');
        }
        if (!user) {
            return handleError(res, 401, 'Invalid email or password.');
        }
        req.logIn(user, (err) => {
            console.log(err);
            if (err) {
                return handleError(res, 500, 'Internal server error.');
            }
            return res.status(200).json({ message: 'Login successful.', user });
        });
    })(req, res, next);
};

// Handle user registration and login for Facebook and Google (similar logic)

// Facebook registration
exports.registerUserFacebook = passport.authenticate('facebook');
// Facebook callback route after successful authentication
exports.registerUserFacebookCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next);
};

// Google registration
exports.registerUserGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
});
// Google callback route after successful authentication
exports.registerUserGoogleCallback = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next);
};

// Facebook login
exports.loginUserFacebook = passport.authenticate('facebook');
// Facebook callback route after successful authentication
exports.loginUserFacebookCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next);
};

// Google login
exports.loginUserGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
});
// Google callback route after successful authentication
exports.loginUserGoogleCallback = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })(req, res, next);
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return handleError(res, 404, 'User not found.');
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return handleError(res, 500, 'Internal server error.');
    }
};

// Update user details by ID
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        // Ensure that the user ID in the request matches the user being updated
        if (userId !== updatedUserData._id) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        // Update the user data, excluding the password field
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedUserData },
            { new: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user by ID
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};