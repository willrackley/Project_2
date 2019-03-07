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
router.get('/customerDash', function(req, res) {
    // Add a join to include all of the orders-details here
    db.Orders.findAll({
      include: [db.DetailedOrder]
    }).then(results => {
	  res.json(results);
	  res.end();
    }).catch(err => console.log(err));
  });

  // end of changes by German

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