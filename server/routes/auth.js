const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (err, user) => {
    if(err){
      res.json({ err });
    }
    passport.authenticate("local")(req, res, function(){
       res.json({ user });
    });
  });
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

module.exports = router;
