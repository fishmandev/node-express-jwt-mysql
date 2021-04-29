const express = require('express');
const router = express.Router();
const verifyToken = require('./../middleware/verifyToken');
const userModel = require('./../model/user');

/* GET home page. */
router.get('/', verifyToken, (req, res, next) => {
  userModel.getUserByField('id', req.userId).then(user => {
    if (user)
      res.json({result: `Hello ${user.username} to the world of security!`});
    else
      res.json({result: `Hello deleted user to the world of security!`});
  })
  
});

module.exports = router;