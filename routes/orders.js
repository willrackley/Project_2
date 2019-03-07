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
        status: req.body.status,
        date: req.body.date,
        comment: req.body.comment
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

router.get('/orders-detailed', (req, res) => {
	db.DetailedOrder.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

router.post('/orders-detailed/add', (req, res) => {
	db.DetailedOrder.create({
		order_id: req.body.orderId,
		product_id: req.body.productId,
        quantity: req.body.quantity,
        total_price: req.body.totalPrice,
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

module.exports = router;