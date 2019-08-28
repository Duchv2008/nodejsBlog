var express = require('express');
var router = express.Router();
var User = require('../models/user.jsx');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({})
    .select('username')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).send(err.errors);
    })
});

module.exports = router;
