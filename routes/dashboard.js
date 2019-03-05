// Dependencies
const express = require('express');
const router = express.Router();
var path = require("path");
const { managerAuthenticated } = require('../config/auth');

router.get('/manager', managerAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
});

module.exports = router;