'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User          = require('../features/users/user.server.model');

module.exports = function (passport) {

  // SERIALIZE USER //
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  // DESERIALIZE USER //
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGN UP / REGISTER //
  passport.use('local-signup', new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {

    process.nextTick(function () {

      User.findOne({username: username}, function (err, user) {
        console.log('user===========', user);
        if (err) {
          console.log('err', err);
          return done(err);
        }

        if (user) {
          return done(null, false);
        } else {

          var newUser      = new User();
          newUser.username = req.body.username;
          newUser.password = req.body.password;
          newUser.name     = req.body.name;

          console.log('newUser ============================= ', newUser);
          newUser.save(function (err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          })
        }
      });
    });
  }));

  // LOCAL LOGIN //
  passport.use('local-login', new LocalStrategy(function (username, password, done) {

    process.nextTick(function () {

      User.findOne({'username': username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        if (!user.validPassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    })
  }));


};