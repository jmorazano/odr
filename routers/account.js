const passport = require('passport');

// models
const User = require('../models/user.js');

exports.ensureAuthenticated = (req, res, next) => {
  console.log('is Authenticated:' + req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Login display
exports.login = (req, res) => {
  const templateData = {
    user: req.user,
  };

  res.render('Login', { templateData });
};

// Login post
exports.login_post = (req, res) => {
  res.redirect('/write');
};

// logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.register = (req, res) => {
  res.render('Register', {});
};

exports.register_post = (req, res) => {
  console.log('---- REQUEST BODY ------- :', req.body);
  if (req.body.password !== req.body.confirm) {
    return res.render('Register');
  } else {
    User.register(new User({ username: req.body.username }), req.body.password, (err, new_user) => {
      if (err) {
        return res.render('Register');
      }
      console.log('**********');
      console.log(new_user);
      res.redirect('/write');
    });
  }
};
