// Dependencies
const express = require('express');
const router = express.Router();
//const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', (req, res) => {
    res.send('dashboard accessed');
});

module.exports = router;