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


router.get("/manager/kitchen-dashboard", managerAuthenticated, function(req, res) {
    //console.log(req.user.id);
    res.sendFile(path.join(__dirname, "../public/kitchen_dashboard.html"));
});



router.get("/manager/edit-menu-item", managerAuthenticated, function(req, res) {
    res.render('pages/editMenuItem');
});


// CUSTOMER ROUTES - all routes associated with customer
router.get('/customer', customerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
});

// --- added by GG - 03/05-2:55pm
// this is to display customer orders form (app/orders/by-user)
//router.get("/customer/orders/by-user", function(req, res) {
router.get("/customer/orders/by-user", customerAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, "../public/customerOrders.html"));
});
// -- end of edits by GG

// FUTURE KITCHEN ROUTES - all routes associated with kitchen
// router.get('/kitchen', customerAuthenticated, (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/userProfile.html"));
// });

module.exports = router;