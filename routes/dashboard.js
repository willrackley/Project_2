// Dependencies
const express = require('express');
const router = express.Router();
var path = require("path");
const { customerAuthenticated, managerAuthenticated, isLogged } = require('../config/auth');

// MAIN DASHBOARD ROUTE 
router.get('/', isLogged, (req, res) => {
});

// MANAGER ROUTES - all routes associated with manager 
router.get('/manager', managerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
});

router.get('/manager/add-menu-category', managerAuthenticated, (req, res) => {
    res.render('pages/addMenuCategory');
});

router.get("/manager/add-menu-item", managerAuthenticated, function(req, res) {
    res.render('pages/addMenuItem');
});

// CUSTOMER ROUTES - all routes associated with customer
router.get('/customer', customerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
});

// FUTURE KITCHEN ROUTES - all routes associated with kitchen
// router.get('/kitchen', customerAuthenticated, (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/userProfile.html"));
// });

module.exports = router;