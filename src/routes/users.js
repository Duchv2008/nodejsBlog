import { Router } from 'express';
var router = Router();
import User from '../models/user.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({})
    .select('username')
    .then(users => {
      console.log(users)
      res.json(users);
    })
    .catch(err => {
      res.status(400).send(err.errors);
    })
});

export default router;
