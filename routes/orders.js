// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
var FullOrders = [];

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
	
// router.get("/:id", function(req, res){
// 	db.Orders.findOne({
// 		where: {
// 			id: req.params.id
// 		}
// 		}).then(function(results) {
// 			res.json(results);
// 		});
// });

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

router.get('/detailed', (req, res) => {
	db.detailOrders.findAll({}).then(results => {
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

// router.get('/kitchen', (req, res) => {  
// 	var FullOrders = [];
// 	var DetailOrders = [];
	
// 	db.Orders.findAll({}).then(results => {

// 		for(var i=0; i < results.length; i++){
// 			FullOrders.push(results[i].get({plain: true}));
// 			FullOrders[i].detailProducts = [];
// 		}
		

// 		db.detailOrders.findAll({}).then(data => {
// 				for(var j=0; j < data.length; j++){
// 					DetailOrders.push(data[j].get());
// 				}

// 		for (var x = 0; x < FullOrders.length; x++) {
// 			for (var y =0; y < DetailOrders.length; y++) {
// 				if (FullOrders[x].id === DetailOrders[y].order_id) {
// 					FullOrders[x].detailProducts.push(DetailOrders[y]);
// 				}
// 			}
// 		}

// 		res.json(FullOrders);

// 		});
// 		});





// 	// }).catch(err => console.log(err));
// });

// link: /app/orders/by-user
router.get('/by-user', (req, res) => {
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

router.get('/kitchen', (req, res) => {
	db.Orders.findAll({
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

module.exports = router;