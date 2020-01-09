const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
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

// Express Session. Note: Session data is stored on the server side only
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

/* app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
}); */

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

app.get('/logout', function (req, res) {
    console.log('Log out');
    req.logout();
    req.flash('success_msg', 'Logged out');
    res.redirect('/users/login');
});

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
