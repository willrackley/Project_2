// Dependencies
const express = require('express');
const router = express.Router();
var path = require("path");
const { ensureAuthenticated } = require('../config/auth');

router.get('/manager', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/managerDashboard.html"));
});

module.exports = router;