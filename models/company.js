const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  legalName: String,
  taxId: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isVerified: Boolean,
  },
  logoUrl: String,
  category: Array,
  userAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
});

// export Page model
module.exports = mongoose.model('Company', companySchema);
