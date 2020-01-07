const express = require('express');
const User = require('../models/user');
let router = express.Router();


router.get('/register', (req, res) => {
	res.render('register');
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
	console.log('Register request:')
	console.log(req.body);

	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		console.log('\n\nValidation Errors!');
		console.log(errors.array());
		res.render('register', {
			errors:errors.array(),
			prevInput:req.body
		});
	}
	else {
		console.log('No validation errors');
		let newUser = User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email:req.body.email,
			password:req.body.password
		});

		User.hashPassword(newUser, (hashed) => {
			console.log(hashed);
			newUser.save((err) => {
				if(err)	console.log(err);
				else {
					console.log('User registered');
					req.flash('success_msg', 'You have been successfully registered');
					res.redirect('login');
				}
			})
		});
	}



/*     // Validation, legacy express-validator API
	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('last_name', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password should contain at least 8 characters').) */

});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res) => {
	console.log('Login Request:')
	console.log(req.body)
});
module.exports = router;
