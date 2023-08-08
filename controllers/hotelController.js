var express = require('express');
var router = express.Router();
var hotelModel = require("../models/hotel")
var passport = require("passport")
var authentication = require('../middlewares/authentication')

router.post('/signup', (req, res, next) => {
    hotelModel.register(new hotelModel({ username: req.body.username }),
        req.body.password, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                if (req.body.name)
                    hotelModel.name = req.body.name;
                if (req.body.role)
                    hotelModel.role = req.body.role;
                hotelModel.save().then(() => {
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
            }
        })
})

router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
    var token = authentication.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!', user: req.user });
})

module.exports = router;