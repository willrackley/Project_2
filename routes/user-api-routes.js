// Dependencies
var path = require("path");
var db = require("../models");
var bodyParser = require("body-parser");


// Routes
module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: false}))
  // index route loads all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(results) {
      res.json(results);
      console.log("it works");
    });
  });

  app.post("/api/users", function(req, res) {
    
    db.User.create({
      balance: 0,
      first_name: req.body.signUpNameInput,
      password: req.body.signUpPasswordInput,
      email: req.body.signUpEmailInput,
      user_group: "customer",
      last_login: 0 
    }).then(function(results) {
      res.redirect("/api/users");
      res.end();
    });
  });
}