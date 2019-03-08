// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();

// Get all the orders
router.get('/', (req, res) => {
	db.Orders.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

// added by German - 03/07
// Get orders, join with product id and orders-detailed
// NOT WORKING
//@route: /app/orders/customerDash
// router.get('/customerDash', function(req, res) {
//     // Add a join to include all of the orders-details here
//     db.Orders.findAll({
//       include: [db.DetailedOrder]
//     }).then(results => {
// 	  res.json(results);
// 	  res.end();
//     }).catch(err => console.log(err));
//   });


	// end of changes by German
	
router.post('/add', (req, res) => {
	db.Orders.create({
		order_user_id: req.user.id,
		total_price: req.body.total_price,
		status: req.body.status,
		comment: req.body.comment
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

router.get('/add/detailed', (req, res) => {
	db.DetailedOrder.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

router.post('/add/detailed', (req, res) => {
	console.log(req.body);
	var totalPrice = (req.body.amount * req.body.price);
	console.log(totalPrice);
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

module.exports = router;