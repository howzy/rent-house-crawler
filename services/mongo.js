const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoUrl = 'mongodb://localhost/rent_house';

mongoose.connect(mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.on('openUri', function () {
  console.log('MongoDB Connection Established.');
});

module.exports = db;
