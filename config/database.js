const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://127.0.0.1:27017/devblog', {useNewUrlParser: true});

connection
  .then((db) => {
    console.log(
      `Successfully connected to MongoDB cluster in mode.`,
    );
    return db;
  }, (err) => {
    if(err.message.code === 'ETIMEDOUT'){
      console.log('Attempting to re-establish database connection.');
			mongoose.connect('mongodb://127.0.0.1:27017/devblog');
    } else {
			console.log('Error while attempting to connect to database:');
			console.log(err);
		}
  })

module.exports = connection;