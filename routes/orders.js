// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
const {
	customerAuthenticated,
	kitchenAuthenticated,
	managerAuthenticated,
	isLogged
} = require('../config/auth');

router.post('/add', customerAuthenticated, (req, res) => {
	db.User.findAll({
		attributes: ['table_loc'],
		where: {
			id: req.user.id
		}
	}).then(results => {
		db.Orders.create({
			order_user_id: req.user.id,
			total_price: req.body.total_price,
			status: req.body.status,
			comment: req.body.comment,
			order_table: results[0].table_loc
		}).then(results => {
			res.json(results);
			res.end();
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
});

router.post('/add/detailed', customerAuthenticated, (req, res) => {
	var totalPrice = (req.body.amount * req.body.price);
	db.detailOrders.create({
		order_id: req.body.order_id,
		product_id: req.body.id,
		quantity: req.body.amount,
		total_price: totalPrice,
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

// @route    app/orders/by-user
// @desc     Joined ALL USERS data with all orders
// @access   Manager
router.get('/by-user/', customerAuthenticated, (req, res) => {
	db.User.findAll({
		include: [{
			model: db.Orders,
			include: [{
				model: db.detailOrders,
				include: [{
					model: db.Products,
				}]
			}]
		}]
	}).then(users => {
		res.send(users);
	});
});

// @route    app/orders/get-last
// @desc     Joined Loged USERS who data with all orders
// @access   Customer
router.get('/get-last', customerAuthenticated, (req, res) => {
	db.User.findAll({
		where: {
			id: req.user.id
		},
		include: [{
			model: db.Orders,
			order: '"createdAt" DESC',
			include: [{
				model: db.detailOrders,
				include: [{
					model: db.Products,
				}]
			}]
		}]
	}).then(users => {
		res.send(users);
	});
});

// @route    app/orders/kitchen
// @desc     Joined orders data, sorted for kitchen
// @access   Manager
router.get('/kitchen', kitchenAuthenticated, (req, res) => {
	db.Orders.findAll({
		order: [
			['createdAt', 'DESC']
		],
		include: [{
			model: db.detailOrders,
			include: [{
				model: db.Products,
			}]
		}]
	}).then(orders => {
		res.send(orders);
	});
});

// @route    app/orders
// @desc     Update route, to update order STATUS
// @access   Manager
router.put("/", kitchenAuthenticated, function(req, res) {
	db.Orders.update(req.body, {
		where: {
			id: req.body.id
		}
	}).then(function(orders) {
		res.json(orders);
	});
});
module.exports = router;