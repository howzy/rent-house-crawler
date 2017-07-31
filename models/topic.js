const mongoose = require('mongoose');

TopicSchema = new mongoose.Schema({
  title: { type: String, index: true, unique: true },
  url: String,
  createTime: String,
  details: [String],
  pics: [String]
});

const TopicModel = mongoose.model('topic', TopicSchema);

module.exports = TopicModel;
