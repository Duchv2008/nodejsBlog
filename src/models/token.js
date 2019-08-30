const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user_id: { type: String, unique: true },
  hash_token: { type: String, unique: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Token', TokenSchema);
