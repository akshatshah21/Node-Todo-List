const express = require('express');
const ejs = require('ejs');
// const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const expressLayouts = require('express-layouts');

const todoRoutes = require('./routes/todoController');
const userRoutes = require('./routes/userController');

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

// Express Session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// ???

// connect-flash
// app.use(flash());


app.use(flash());
/* app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
}); */


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');  // Passport sets its own 'error' messages
    next();
});





// Routes
// todoController(app);
app.use('/todo', todoRoutes);
// userController(app);
app.use('/users', userRoutes);

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
