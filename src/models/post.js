const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { type: String },
  title: { type: String, text: true },
  content: { type: String, text: true },
  status: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Post', PostSchema);
