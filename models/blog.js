const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  urltitle: String,
  body: String,
  lastupdated: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

// export Page model
module.exports = mongoose.model('Blog', blogSchema);
