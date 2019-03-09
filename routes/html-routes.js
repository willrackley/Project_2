var path = require("path");
var tableNumber;
const {
	isLogged
} = require('../config/auth');

module.exports = function(app) {

	// @route    /
	// @desc     Home Page
	// @access   Public
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	// @route    /login
	// @desc     User's Login Page
	// @access   Public
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

	// @route    /login/table
	// @desc     User's Login Page FROM QR CODE LINK
	// @access   Public
	app.get("/login/table", function(req, res) {
		if (req.query.id) {
			var scannedId = req.query.id;
			var idLetter = countUpperCaseChars(scannedId);
		}
		if (scannedId.length === 10 && idLetter === 5) {
			tableNumber = scannedId;
			req.flash('success_msg', 'Table number assigned. Please log in.');
			req.flash('table_number', tableNumber);
			res.redirect('/login');
		} else {
			req.flash('error_msg', 'Error..? Hacking huh..?');
			res.redirect('/login');
		}
	});

	// -- end of edits by GG
	// @route    /app
	// @desc     Empty
	// @access   Public
	app.get('/app', isLogged, (req, res) => {
		// This route is secured, used only to redirect user. (isLogged)
	});
};

// Function to return how many capital letters in string. QR code security.
function countUpperCaseChars(str) {
	var count = 0,
		len = str.length;
	for (var i = 0; i < len; i++) {
		if (/[A-Z]/.test(str.charAt(i))) count++;
	}
	return count;
}