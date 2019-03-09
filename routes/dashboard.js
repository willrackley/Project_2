// Dependencies
const express = require('express');
const router = express.Router();
var path = require("path");
const { customerAuthenticated, managerAuthenticated, kitchenAuthenticated, isLogged } = require('../config/auth');

// @route    app/dashboard
// @desc     Update route, to update order STATUS
// @access   All Users
router.get('/', isLogged, (req, res) => {
});

// @route    app/dashboard/manager
// @desc     Manager Dashboard
// @access   Manager
router.get('/manager', managerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
});

// @route    app/dashboard/manager/add-menu-category
// @desc     Add Menu Category Display
// @access   Manager
router.get('/manager/add-menu-category', managerAuthenticated, (req, res) => {
    res.render('pages/addMenuCategory');
});

// @route    app/dashboard/manager/add-menu-item
// @desc     Add Menu Item Display
// @access   Manager
router.get("/manager/add-menu-item", managerAuthenticated, function(req, res) {
    res.render('pages/addMenuItem');
});

// @route    app/dashboard/manager/edit-menu-item
// @desc     Add Menu Item Display
// @access   Manager
router.get("/manager/edit-menu-item", managerAuthenticated, function(req, res) {
    res.render('pages/editMenuItem');
});

// @route    app/dashboard/customer
// @desc     Customers dashboard
// @access   Customer
router.get('/customer', customerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
});

// @route    app/dashboard/customer/orders
// @desc     Customers Last Order
// @access   Customer
router.get('/customer/orders', customerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/customerOrders.html"));
});

// @route    app/dashboard/kitchen
// @desc     Kitchen Dashboard
// @access   Kitchen
router.get("/kitchen", kitchenAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/kitchen_dashboard.html"));
});

module.exports = router;