// Dependencies
const express = require('express');
const router = express.Router();
var path = require("path");
const { customerAuthenticated, managerAuthenticated, isLogged } = require('../config/auth');

// MAIN DASHBOARD ROUTE 
router.get('/', isLogged, (req, res) => {
    // This route is secured, used only to redirect user. (isLogged)
});

// MANAGER ROUTES - all routes associated with manager 
router.get('/manager', managerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
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