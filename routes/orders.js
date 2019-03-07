// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
router.get('/', (req, res) => {
	db.Orders.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});
router.post('/add', (req, res) => {
	db.Orders.create({
		order_user_id: req.body.orderUserId,
		menu_id:req.body.menuId,
        status: req.body.status,
        date: req.body.date,
        comment: req.body.comment
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});
module.exports = router;