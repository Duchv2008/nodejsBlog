const mongoose = require("mongoose");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password_digest: { type: String, unique: true },
  created_at: { 
    type: Date,
    default: Date.now
  },
  updated_at: { 
    type: Date,
    default: Date.now
  }
});

//hashing a password before saving it to the database
UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password_digest, 10, function (err, hash) {
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

UserSchema.methods.generateJWTToken = function () {
  var payload = { username: this.username, id: this.id };
  var privateKey = "this is private key"; // Gen Hash
  var jwtToken = jwt.sign(payload, privateKey, { expiresIn: "2h" });
  return jwtToken;
};

module.exports = mongoose.model("User", UserSchema);
