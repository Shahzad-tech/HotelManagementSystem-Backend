var express = require('express');
var router = express.Router();
var user = require('../models/user');
var passport = require('passport');
var authentication = require('../middlewares/authentication')


router.post('/signup', (req, res, next) => {
    user.register(new user({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                if (req.body.name)
                    user.name = req.body.name;
                if (req.body.role)
                    user.role = req.body.role;
                user.save().then(() => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                })
                .catch((err)=>{
                  console.log(err)
                });
            }
        });
  });
  
  router.post('/login',passport.authenticate('local', {session:false}),(req,res,next)=>{
    var token = authentication.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!',user:req.user });
  })
  
  module.exports = router;