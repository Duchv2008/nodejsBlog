const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

module.exports = mongoose.model("User", userSchema);
