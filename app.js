const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const expressLayouts = require('express-layouts');
const userRoutes = require('./routes/userController');
const todoRoutes = require('./routes/todoController');


// Initialize app
const app = express()

// View engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Folder
app.use(express.static(__dirname + '/public'));

// Body-parser, cookie-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Express Session. Note: Session data is stored on the server side only
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


// connect-flash
app.use(flash());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');  // Passport sets its own 'error' messages
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/todo', todoRoutes);


app.get('/logout', function (req, res) {
    // console.log('Log out');
    req.logout();
    req.flash('success_msg', 'Logged out');
    res.redirect('/users/login');
});

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
