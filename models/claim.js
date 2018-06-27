const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  status: String,
  data: {
    purchaseDate: Date,
    paidAmount: Number,
    description: String,
    questions: [String],
    files: [String],
  },
});

// export Page model
module.exports = mongoose.model('Claim', claimSchema);
