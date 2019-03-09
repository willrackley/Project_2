// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
const { customerAuthenticated, managerAuthenticated, isLogged } = require('../config/auth');
var FullOrders = [];

// Get all the orders
router.get('/', (req, res) => {
	db.Orders.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});
	
router.post('/add', (req, res) => {
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

router.get('/detailed', (req, res) => {
	db.detailOrders.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

router.post('/add/detailed', (req, res) => {
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
//});

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
			
		}]
	}).then(users => {
		
		res.send(users);
	});
});


// link: /app/orders/get-last
router.get('/get-last', customerAuthenticated, (req, res) => {
	//console.log(req.user.id);
	db.User.findAll({
		where: {
			id: req.user.id
		},
		include: [{
			model: db.Orders,
			order: '"createdAt" DESC', // ASC DESC
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
		order: [['createdAt', 'DESC']],
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

// PUT route for updating posts
router.put("/", function(req, res) {
    db.Orders.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(orders) {
      res.json(orders);
    });
  });

module.exports = router;