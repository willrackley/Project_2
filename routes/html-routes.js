var path = require("path");
var tableNumber;
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

	// get users table numberdum
	app.get("/login/table", function(req, res) {
		if (req.query.id) {
			var scannedId = req.query.id;
			var idLetter = countUpperCaseChars(scannedId);
		}
		if(scannedId.length === 10 && idLetter === 5) {
			tableNumber = scannedId;
			req.flash('success_msg', 'Table number assigned. Please log in.');
			req.flash('table_number', tableNumber);
			res.redirect('/login');
		} else {
			req.flash('error_msg', 'Error..? Hacking huh..?');
			res.redirect('/login');
		}
	});

	// --- added by GG - 03/05-2:55pm
	// this is to display customer orders form (app/orders/by-user)
	app.get("/customer/orders/by-user", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/customerOrders.html"));
	});
	// -- end of edits by GG
	
	// MAIN APP ROUTE 
	app.get('/app', isLogged, (req, res) => {
		// This route is secured, used only to redirect user. (isLogged)
	});
};

function countUpperCaseChars(str) {
	var count=0,len=str.length;
	for(var i=0;i<len;i++) {
	  if(/[A-Z]/.test(str.charAt(i))) count++;
	}
	return count;
  }