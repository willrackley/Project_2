// Dependencies
const express = require('express');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Setting up database
const db = require("./models");

// Setting up the Express App, assigning port
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up Body Parser
app.use(express.urlencoded({
	extended: false
}));

// Express Sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Setting up flash messages
app.use(flash());

// Global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
  });

// Setting up templates 
app.set('view engine', 'ejs');

// Passport config
require('./config/passport')(passport);

// Setting up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/app/users', require('./routes/users'));
app.use('/app/products', require('./routes/products'));
app.use('/app/dashboard', require('./routes/dashboard'));
app.use('/app/orders', require('./routes/orders'))
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// force set to true, means that we drop our tables every time we run server
db.sequelize.sync({
	force: false
}).then(function() {
	app.listen(PORT, function() {
		console.log(`INFO: Application is running on port: ${PORT}`);
	});
});