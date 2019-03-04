// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();

router.get('/', (req, res) => {
  db.Products.findAll({})
    .then(results => {
      res.json(results);
      res.end();
  })
    .catch(err => console.log(err));
});

module.exports = router;