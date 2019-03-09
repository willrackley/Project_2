// Dependencies
const express = require('express');
const db = require("../models");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Function to assign actual table id by customer's scanned QR
function assignTableId(idFromForm) {
	if (idFromForm === 'A1A2A3A4A5') {
		return 'B1'
	} else if (idFromForm === 'B1B2B3B4B5') {
		return 'B2'
	} else if (idFromForm === 'C1C2C3C4C5') {
		return 'B3'
	} else {
		return 0;
	}
}

// @route    app/users/add
// @desc     User registration route
// @access   Public
router.post('/register', (req, res) => {
	let {
		name,
		email,
		password,
		password2
	} = req.body;
	let messages = [];
	// If statement to check do we have 4 input values
	if (!name || !email || !password || !password2) {
		messages.push({
			msg: 'Please enter all fields',
			type: 'warning'
		});
	}
	// If statement to check does password matches confirm password field
	if (password !== password2) {
		messages.push({
			msg: 'Passwords do not match',
			type: 'warning'
		});
	}
	// If statemant to check passwords lenght
	if (password.length < 6) {
		messages.push({
			msg: 'Password must be at least 6 characters',
			type: 'warning'
		});
	}
	// If we have errors return them to form
	if (messages.length > 0) {
		return res.json(messages);
		// If we don't have errors continue
	} else {
		// Prepare form values for database
		name = name.toLowerCase();
		name = name.charAt(0).toUpperCase() + name.slice(1);
		email = email.toLowerCase();
		// Hash users password
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		// Sequelize function to find user by email
		// If user exist we respond with error msg
		// If user doesn't exist, create new record
		db.User.findOrCreate({
			where: {
				email: email
			},
			defaults: {
				first_name: name,
				password: hash,
				user_group: 'customer',
				balance: 0
			}
		}).spread((user, created) => {
			if (!created) {
				messages.push({
					msg: 'User with this email already exists',
					type: 'warning'
				});
				return res.json(messages);
			} else {
				messages.push({
					msg: 'Account successfully created, you can login.',
					type: 'success'
				});
				return res.json(messages);
			}
		})
	}
});

// @route    app/users/login
// @desc     User login route, sessions and table assigment included here
// @access   Public
router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash('error', info.message);
			req.flash('table_number', req.body.qrtnrtbl)
			return res.redirect('/login');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			if (user.user_group === 'customer' && req.body.qrtnrtbl !== '') {
				var tableNumber = assignTableId(req.body.qrtnrtbl);
				db.User.update({
					table_loc: tableNumber,
				}, {
					where: {
						id: req.user.id
					}
				}).then(results => {
					return res.redirect('/app/dashboard/customer');
				});
			} else {
				return res.redirect('/app/dashboard');
			}
		});
	})(req, res, next);
});

// @route    app/users/logout
// @desc     User logout route
// @access   For all user groups
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success_msg', 'You are successfully logged out');
	res.redirect('/login');
});

module.exports = router;