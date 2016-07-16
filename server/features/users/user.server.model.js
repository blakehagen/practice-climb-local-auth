'use strict';

var bcrypt   = require('bcryptjs');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String},
  username: {type: String},
  password: {type: String}
});

// HASH PASSWORD //
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// CHECK IF PASSWORD VALID //
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);
