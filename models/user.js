const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  avatarUrl: String,
  userType: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isVerified: Boolean,
  },
  identification: {
    idNumber: Number,
    idType: String,
    isVerified: Boolean,
  },
  phone: {
    areaCode: Number,
    number: Number,
    isVerified: Boolean,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre('save', function (next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.plugin(passportLocalMongoose);

// return User model
module.exports = mongoose.model('User', userSchema);
