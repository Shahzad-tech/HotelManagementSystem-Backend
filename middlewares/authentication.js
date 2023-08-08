require('dotenv').config();
var passport = require('passport');
var User = require('../models/user');
var passportJwt = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var secretKey = process.env.TOKEN_SECRET_KEY;
var ExtractJwt = passportJwt.ExtractJwt
var JwtStrategy = passportJwt.Strategy

/* Passport local Strategy will used only for login purpose. 
When successfully authenticated through passoport local strategy, it would send token using getToken method */

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
exports.getToken = function (User) {
    return jwt.sign(User, process.env.TOKEN_SECRET_KEY, { expiresIn: 3600 })
}


/* Passport Jwt Strategy will be used for the requests other then login requests. it will sign, validate token*/

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });
