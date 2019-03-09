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


	// }).catch(err => console.log(err));
});








// link: /app/orders/by-user
router.get('/by-user/', (req, res) => {
	db.User.findAll({
		include: [{
			model: db.Orders,
			include: [{
				model: db.detailOrders,
					include: [{
						model: db.Products,
					}]
			}]
			//where: {order_user_id:  req.User.id }
		}]
	}).then(users => {
		//console.log(req.User.id); 
		res.send(users);
	});
});

// router.get('/by-user', (req, res) => {

// 	db.User.findAll({
// 		include: [{
// 			model: db.Orders,
// 			include: [{
// 				model: db.detailOrders,
// 					include: [{
// 						model: db.Products,
// 					}]
// 			}]
// 			//where: {order_user_id:  req.User.id }
// 		}]
// 	}).then(users => {
// 		//console.log(req.User.id); 
// 		res.send(users);
// 	});
// });

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