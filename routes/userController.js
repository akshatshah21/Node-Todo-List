const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let router = express.Router();


router.get('/register', (req, res) => {
    if(!req.user)
        res.render('register');
    else
        res.send(`You are already logged in as ${req.user.first_name + ' ' + req.user.last_name}!`);
});

const { check, validationResult } = require('express-validator');


let validationChecks = [
	check('first_name', 'First name is required').notEmpty(),
	check('last_name', 'Last name is required').notEmpty(),
	check('email', 'Email address is required').notEmpty(),
	check('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
	check('password', 'Please enter a password').notEmpty(),
	check('password', 'Minimum  length of password should be 8 characters').isLength({min:8}),
	check('password2', 'Passwords don\'t match').matches('password')
];

router.post('/register', validationChecks, (req, res) => {
	// console.log('Register request:')
	// console.log(req.body);

	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		// console.log('\n\nValidation Errors!');
		// console.log(errors.array());
		res.render('register', {
			errors:errors.array(),
			prevInput:req.body
		});
	}
	else {
		// console.log('No validation errors');
		let newUser = User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email:req.body.email,
			password:req.body.password
		});

		User.hashPassword(newUser, (hashed) => {
			// console.log(hashed);
			newUser.save((err) => {
				if(err)	console.log(err);
				else {
                    // console.log('User registered');
					req.flash('success_msg', 'You have been successfully registered');
					res.redirect('login');
				}
			})
		});
	}
});

router.get('/login', (req, res) => {
    if(!req.user)
        res.render('login');
    else
        res.send(`You are already logged in as ${req.user.first_name + ' ' + req.user.last_name}!`);
});


passport.use(new LocalStrategy({usernameField: 'email'},
    function(email, password, done) {
		// console.log('checking...');
        User.getUserByEmail(email, (err, user) => {
            if(err) {
				console.log(err);
				return done(err);
			}
            else if(!user) {
				// console.log('No such user');
                return done(null, false, {message:'Unknown user'});
            }
             else {
			// 	console.log('User found')
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if(err) console.log(err);
                    else if(isMatch) {
                        // console.log('Match!');
                        return done(null, user);
                    }
                    else  {
                        // console.log('Invalid password');
                        return done(null, false, {message:'Invalid password'});
                    }
                });
            }
        });
    }));

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
		done(err, user);
  });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/todo',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: 'Welcome!'
    }),
    (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.flash('success_msg', 'Login successful');
        req.session.user = req.user;
        res.redirect('/todo');      

});


module.exports = router;
