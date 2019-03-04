
var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

 
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
  });

  app.get("/manager-dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
  });

  app.get("/add-menu-item", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addMenuItem.html"));
  });

};
