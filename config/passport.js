const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
	passport.use(new LocalStrategy({
		usernameField: 'email'
	}, function(email, password, done) {
		db.User.findAll({
			where: {
				email: email
			}
		}).then(user => {
			if (user.length === 0) {
				return done(null, false, {
					message: 'Email address is not registered'
				});
			}
			bcrypt.compare(password, user[0].password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user, {
						message: 'Successfully connected'
					});
				} else {
					return done(null, false, {
						message: 'Password is not correct'
					});
				}
			})
		})
	}));
	passport.serializeUser(function(user, done) {
        console.log("idedam i sesija");
        console.log(user[0].id);
		done(null, user[0].id);
	});
	passport.deserializeUser(function(id, done) {
		db.User.findByPk(id, function(err, user) {
            console.log("kazkas ivyksta");
			done(err, user);
		});
	});
}