// Passport function to check is user allowed to see content
// If user is not allowed to see content, redirect to login page
module.exports = {
	// Regular customer authentication
	customerAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.user_group === "customer") return next();
		}
		res.redirect('/login');
	},
	// Manager authentication
	managerAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.user_group === "manager") return next();
		}
		res.redirect('/login');
	},
	// Kitchen or Manager authentication
	kitchenAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.user_group === "kitchen" || req.user.user_group == "manager") return next();
		}
		res.redirect('/login');
	},
	// Function to check is user access status and redirect
	isLogged: function(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.user_group === "customer") {
				res.redirect('/app/dashboard/customer');
			} else if (req.user.user_group === "manager") {
				res.redirect('/app/dashboard/manager');
			} else {
				res.redirect('/app/dashboard/kitchen');
			}
		} else {
			res.redirect('/login');
		}
	}
};