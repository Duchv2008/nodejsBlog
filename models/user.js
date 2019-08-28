const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password_digest: String,
});

module.exports = mongoose.model('User', userSchema);
// export default mongoose.model('User', userSchema)