const mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/rent_house', {
  server: { poolSize: 5 }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.on('openUri', function () {
  console.log('MongoDB Connection Established.');
});

module.exports = db;
