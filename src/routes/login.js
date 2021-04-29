const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('./../model/user');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  const email = req.body.email || '';
  const password = req.body.password || '';

  userModel.getUserByField('email', email).then(user => {
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ erorr: 'Invalid user email or password' });

    let token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json({ accessToken: token });
  }).catch(next);
});

module.exports = router;