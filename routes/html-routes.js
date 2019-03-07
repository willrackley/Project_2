var path = require("path");
const { isLogged } = require('../config/auth');

module.exports = function(app) {
	// Index page route /
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});
	// Login page route /login
	app.get("/login", function(req, res) {
		if (req.user) {
			if (req.user.user_group === "customer") {
				res.redirect('/app/dashboard/customer');
			} else if (req.user.user_group === "manager") {
				res.redirect('/app/dashboard/manager');
			} else {
				res.redirect('/app/dashboard/kitchen');
			}
		} else {
		res.render('pages/login');
		// res.sendFile(path.join(__dirname, "../public/userProfile.html"));
		}
	});
	// this route has to be moved or deleted dashboard.js (app/dashboard/customer)
	app.get("/profile", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/userProfile.html"));
	});
	// this route has to be moved or deleted dashboard.js file (app/dashboard/manager)
	app.get("/manager-dashboard", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
	});
	// --- added by GG - 03/05-2:55pm
	// this is to display orders form (app/orders)
	app.get("/orders", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/orders.html"));
	});
	// -- end of edits by GG
	// MAIN APP ROUTE 
	app.get('/app', isLogged, (req, res) => {
		// This route is secured, used only to redirect user. (isLogged)
	});
};