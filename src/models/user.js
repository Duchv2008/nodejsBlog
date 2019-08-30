const mongoose = require('mongoose');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password_digest: { type: String, unique: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password_digest, 10, function(err, hash) {
    if (err) {
      next(err);
    }
    user.password_digest = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password_digest);
};

UserSchema.methods.generateJWTToken = function(created_at, hash_token) {
  var payload = {
    username: this.username,
    id: this.id,
    created_at: created_at,
    hash_token: hash_token,
  };
  var jwtToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
  }); // miliseconds
  return jwtToken;
};

UserSchema.methods.generateJWTRefreshToken = function(created_at) {
  var payload = { id: this.id, created_at: created_at };

  var jwtToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRED_TIME,
  });
  return jwtToken;
};

module.exports = mongoose.model('User', UserSchema);
