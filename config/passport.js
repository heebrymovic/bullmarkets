const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

// Serialize user object to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user object from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Define the local strategy for authenticating users
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }
                    if (!user.validatePassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });

        }
    )
);

// Passport.js Facebook OAuth configuration
// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: '322593000299324',
//             clientSecret: 'b650ba228b00780fb8d9d9b9eb446ae8',
//             callbackURL: 'http://your-app-domain/auth/facebook/callback',
//             profileFields: ['id', 'displayName', 'email'],
//         },
//         (accessToken, refreshToken, profile, done) => {
//             // Find or create a user based on the Facebook profile information
//             User.findOne({ facebookId: profile.id }, (err, user) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     // Create a new user with the Facebook profile data
//                     const newUser = new User({
//                         facebookId: profile.id,
//                         displayName: profile.displayName,
//                         email: profile.emails[0].value,
//                     });
//                     newUser.save((err) => {
//                         if (err) {
//                             return done(err);
//                         }
//                         return done(null, newUser);
//                     });
//                 } else {
//                     return done(null, user);
//                 }
//             });
//         }
//     )
// );

// Passport.js Google OAuth configuration
passport.use(
    new GoogleStrategy(
        {
            // clientID: process.env.GOOGLE_CLIENT_ID,
            clientID: '325313091128-kb3um9j1tr6so626c6rm1rhm0b5q4erl.apps.googleusercontent.com',
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientSecret: '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',
            callbackURL: 'http://bullmarkets.org/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // Find or create a user based on the Google profile information
            User.findOne({ googleId: profile.id }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // Create a new user with the Google profile data
                    const newUser = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                    });
                    newUser.save((err) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                } else {
                    return done(null, user);
                }
            });
        }
    )
);


