// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
const {
	customerAuthenticated,
	managerAuthenticated,
	isLogged
} = require('../config/auth');
// @route    app/products
// @desc     Test route to see all products as object
// @access   Public
router.get('/', (req, res) => {
	db.Products.findAll({}).then(results => {
		res.json(results);
		res.end();
	}).catch(err => console.log(err));
});

// @route    app/products/categories
// @desc     Pull product categories from database
// @access   Manager
// @status   Need to be removed before production
router.get('/categories', (req, res) => {
	db.productCategories.findAll({}).then(results => {
		res.send(results);
	}).catch(err => console.log(err));
});

// @route    app/products/categories/add
// @desc     Add menu category to database
// @access   Only Manager
// @status   Completed
router.post('/categories/add', managerAuthenticated, (req, res) => {
	var categoryName = req.body.categoryName;
	if (categoryName === '') {
		req.flash('error_msg', 'Category name can not be empty!');
		res.redirect('/app/dashboard/manager/add-menu-category');
	} else {
		// Make lower case and first letter capital
		categoryName = categoryName.toLowerCase();
		categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
		// Add if doesn't exist in database with same name
		db.productCategories.findOrCreate({
			where: {
				name: categoryName
			}
		}).spread((user, created) => {
			if (!created) {
				req.flash('error_msg', 'Category with this name already exists');
				res.redirect('/app/dashboard/manager/add-menu-category');
			} else {
				req.flash('success_msg', 'Category successfully created');
				res.redirect('/app/dashboard/manager/add-menu-category');
			}
		})
	}
});
// @route    app/products/add
// @desc     Add form input (product) in database
// @access   Only Manager
// @status   Not finished needs validations and security check
router.post('/add', (req, res) => {
	console.log(req.body);
	db.Products.create({
		name: req.body.itemName,
		description: req.body.itemDecription,
		regular_price: req.body.regularPrice,
		discount_price: req.body.discountPrice,
		category_id: req.body.productCategory,
		product_image: req.body.productImg,
	}).then(results => {
		req.flash('success_msg', 'Menu item successfully added');
		res.redirect('/app/dashboard/manager/add-menu-item');
	}).catch(err => console.log(err));
});
module.exports = router;