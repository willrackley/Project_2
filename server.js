// Dependencies
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// Setting up database
const db = require("./models");

// Setting up the Express App, assigning port
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport')(passport);

// Setting up static directory
app.use(express.static(path.join(__dirname, 'public')));

// User Routes
app.use('/app/users', require('./routes/users'));

// Product routes
app.use('/app/products', require('./routes/products'));

// Syncing our sequelize models and then starting our Express app
// force set to true, means that we drop our tables every time we run server
db.sequelize.sync({force: false}).then(function() {
	app.listen(PORT, function() {
		console.log(`INFO: Application is running on port: ${PORT}`);
	});
});