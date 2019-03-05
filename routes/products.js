// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
router.get('/', (req, res) => {
	db.Products.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});
router.post('/add', (req, res) => {
	db.Products.create({
		name: req.body.itemName,
		description: req.body.itemDecription,
		discount_price: req.body.discountPrice,
		category_id: req.body.CatID,
		product_image: req.body.productImg,
	}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});
module.exports = router;