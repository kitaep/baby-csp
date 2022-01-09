var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');


module.exports = function() {

    passport.use(new Strategy(function(username, password, cb) {
        db.query('SELECT * FROM users WHERE username=?', [ username ], function(err, row, fields) {
            if (err) { return cb(err); }
            if (!row[0]) { return cb(null, false, { message: 'Incorrect username or password.' }); }
            console.log(row)
            crypto.pbkdf2(password, row[0].salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row[0].hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            
            var user = {
                id: row[0].id,
                username: row[0].username,
                nonceFlag: row[0].nonce_flag
            };

            return cb(null, user);
            });
        });

    }));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, username: user.username, nonceFlag: user.nonceFlag });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

};