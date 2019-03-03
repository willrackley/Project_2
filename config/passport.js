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
					message: 'That email is not registered'
				});
			}
			bcrypt.compare(password, user[0].password, (err, isMatch) => {
                if (err) throw err;

                // we check does password match if it matches we have to redirect to dashboard if not error message
                console.log(isMatch);
			})
		})
    }));
    
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		db.User.findById(id, function(err, user) {
			done(err, user);
		});
	});
}