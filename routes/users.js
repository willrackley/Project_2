// Dependencies
const express = require('express');
const db = require("../models");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Router just for testing to see all users
router.get('/', (req, res) => {
	db.User.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

// Route to handle user registration
router.post('/register', (req, res) => {
  console.log(req.body);
	let { name, email, password, password2 } = req.body;
  let messages = [];
  
  // If statement to check do we have 4 input values
	if (!name || !email || !password || !password2) {
		messages.push({msg: 'Please enter all fields', type: 'warning' });
  }
  // If statement to check does password matches confirm password field
	if (password !== password2) {
		messages.push({msg: 'Passwords do not match', type: 'warning' });
  }
  // If statemant to check passwords lenght
	if (password.length < 6) {
    messages.push({	msg: 'Password must be at least 6 characters', type: 'warning' });
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
				messages.push({ msg: 'User with this email already exists', type: 'warning' });
				return res.json(messages);
			} else {
				messages.push({ msg: 'Account successfully created, you can login.', type: 'success' });
				return res.json(messages);
			}
		})
	}
});

router.post('/login', (req, res, next) => {
	let messages = [];
	passport.authenticate('local', function(err, user, info) {
		console.log(info);
		if (err) { 
			return next(err);
			 }
    if (!user) {
			messages.push({ info, type: 'warning' });
			return res.json(messages);
		}
		else {
			console.log("pradedam login funkcija");
			console.log(user[0].id)
    req.logIn(user, function(err) {
			if (err) { 
				return next(err); 
			} else {
				console.log("connected");
			return res.json(user);
			}
		});
	}
  })(req, res, next);
});

module.exports = router;