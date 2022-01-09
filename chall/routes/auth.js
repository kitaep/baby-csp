const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
var db = require('../db');

const router = express.Router();

router.get('/login', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
    failWithError: true
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});
  
router.post('/register', function(req, res, next) {
    let username = req.body.username;
    //let password = req.body.password;
    let password = crypto.randomBytes(16).toString("hex"); // random password
    let salt = crypto.randomBytes(16);
    let nonceFlag = false;
    console.log(username, password, salt, nonceFlag)

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return next(err); }
        
        db.query('INSERT INTO users (username, hashed_password, salt, nonce_flag) VALUES (?, ?, ?, ?)', [
        username,
        hashedPassword,
        salt,
        nonceFlag
        ], 
        function(err, results, fields) {
            if (err) { return next(err); }
        
            var user = {
                id: results.insertId.toString(),
                username: req.body.username,
                nonceFlag: nonceFlag
            };

            req.login(user, function(err) {
                if (err) { return next(err); }
                res.json({"username":username, "password": password});
            });
        });
    });
});
  

module.exports = router;