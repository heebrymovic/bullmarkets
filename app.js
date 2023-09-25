require('dotenv').config()
require('./config/database')
const express = require('express');
const app = express();
const passport = require('passport');
require('./config/passport')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const session = require('express-session');

// register view engine
app.set('view engine', 'ejs');

// Import routers for controllers
const userRouter = require('./routes/userRouter');
const investmentRouter = require('./routes/investmentRouter');
const transactionRouter = require('./routes/transactionRouter');
const portfolioRouter = require('./routes/portfolioRouter');
const notificationRouter = require('./routes/notificationRouter');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '45ththy45', // replace 'your-secret-key' with a secret string of your choice
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set this to true if you're using HTTPS
}));

// passport
app.use(passport.initialize());
app.use(passport.session());



// Mount routers on specific base paths
app.use('/api/users', userRouter);
app.use('/api/investments', investmentRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/portfolios', portfolioRouter);
app.use('/api/notifications', notificationRouter);

// Other middleware and app configuration


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/404', (req, res) => {
    res.render(__dirname + '/views/pages/404');
});

app.get('/about', (req, res) => {
    res.render(__dirname + '/views/pages/about');
});


app.get('/blog', (req, res) => {
    res.render(__dirname + '/views/pages/blog');
});

app.get('/contact', (req, res) => {
    res.render(__dirname + '/views/pages/contact');
});

app.get('/faq', (req, res) => {
    res.render(__dirname + '/views/pages/faq');
});

app.get('/plan', (req, res) => {
    res.render(__dirname + '/views/pages/plan');
});

app.get('/login', (req, res) => {
    res.render(__dirname + '/views/pages/login');
});

app.get('/register', (req, res) => {
    res.render(__dirname + '/views/pages/register');
});

app.get('/reset', (req, res) => {
    res.render(__dirname + '/views/pages/reset');
});

// user dashboard 

app.get('/user/add-fund', (req, res) => {
    res.render(__dirname + '/views/users/add-fund');
});

app.get('/user/dashboard', (req, res) => {
    res.render(__dirname + '/views/users/dashboard');
});

app.get('/user/fund-history', (req, res) => {
    res.render(__dirname + '/views/users/fund-history');
});

app.get('/user/invest-history', (req, res) => {
    res.render(__dirname + '/views/users/invest-history');
});

app.get('/user/money-transfer', (req, res) => {
    res.render(__dirname + '/views/users/money-transfer');
});

app.get('/user/payout-history', (req, res) => {
    res.render(__dirname + '/views/users/payout-history');
});

app.get('/user/payout', (req, res) => {
    res.render(__dirname + '/views/users/payout');
});

app.get('/user/profile', (req, res) => {
    res.render(__dirname + '/views/users/profile');
});

app.get('/user/referral', (req, res) => {
    res.render(__dirname + '/views/users/referral');
});

app.get('/user/transaction', (req, res) => {
    res.render(__dirname + '/views/users/transaction');
});

app.get('/user/twostep-security', (req, res) => {
    res.render(__dirname + '/views/users/twostep-security');
});