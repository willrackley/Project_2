// Passport function to check is user allowed to see content
// If user is not allowed to see content, redirect to login page
module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}
};