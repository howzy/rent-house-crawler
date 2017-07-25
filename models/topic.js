const mongoose = require('mongoose');

TopicSchema = new mongoose.Schema({
  title: String,
  url: String,
  createTime: Number,
  details: [String]
});

const TopicModel = mongoose.model('topic', TopicSchema);

module.exports = TopicModel;
