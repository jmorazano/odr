const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const passport = require('passport');

// models
const User = require('../models/user');

exports.ensureAuthenticated = (req, res, next) => {
  console.log(`is Authenticated: ${req.isAuthenticated()}`);

  if (req.isAuthenticated()) {
    return next();
  }

  const templateData = {
    user: req.user,
    nextUrl: req.url,
  };
  // res.redirect('/login');
  res.render('Authentication/Login', { templateData });
};

// Login display
exports.login = (req, res) => {
  const templateData = {
    user: req.user,
  };

  res.render('Authentication/Login', { templateData });
};

// Login post
exports.login_post = (req, res) => {
  console.log('reqqq next url', req.body.next_url);
  if (req.body.next_url) {
    res.redirect(req.body.next_url);
  } else {
    res.redirect(`/admin/${req.user.username}`);
  }
};

// logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

exports.register = (req, res) => {
  console.log('next url!!!', req.query.next_url);
  const templateData = {};
  if (req.query.next_url) {
    templateData.nextUrl = req.query.next_url;
  }
  res.render('Authentication/Register', { templateData });
};

exports.register_post = (req, res) => {
  if (req.body.password !== req.body.confirm) {
    return res.render('Authentication/Register');
  }

  User.register(
    new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }),
    req.body.password,
    (err, new_user) => {
      if (err) {
        console.log('Error al registrar:', err);
        return res.render('Authentication/Register');
      }
      passport.authenticate('local')(req, res, () => {
        if (req.body.next_url) {
          res.redirect(req.body.next_url);
        } else {
          const templateData = {
            currentUser: req.user,
          };
          res.render('Authentication/RegisterCongrats', templateData);
        }
      });
    }
  );
};

exports.forgot = (req, res) => {
  const templateData = {
    currentUser: req.user,
  };
  res.render('Authentication/Forgot', templateData);
};

exports.forgot_post = (req, res, next) => {
  async.waterfall(
    [
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      (token, done) => {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (!user) {
            // req.flash('error', 'No account with that email address exists.');
            console.log('error: No account with that email address exists.');
            return res.redirect('/forgot');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      (token, user, done) => {
        const options = {
          auth: {
            api_user: 'jmorazano',
            api_key: 'Raimundos2909!',
          },
        };

        const smtpTransport = nodemailer.createTransport(sgTransport(options));
        const mailOptions = {
          to: user.email,
          from: 'passwordreset@odr.com',
          subject: 'Reseteo de contraseña ODR',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' +
            req.headers.host +
            '/reset/' +
            token +
            '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          // req.flash('info', `An e-mail has been sent to ${user.email} with further instructions.`);
          done(err, 'done');
        });
      },
    ],
    (err) => {
      if (err) return next(err);
      res.redirect('/forgot');
    }
  );
};

exports.forgot_post = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      return res.redirect('/forgot');
    }
    const templateData = {
      currentUser: req.user,
    };
    res.render('Authentication/Login', templateData);
  });
};

exports.resetPass = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('Authentication/ResetPass', {
      user: req.user,
    });
  });
};

exports.resetPassPost = (req, res) => {
  async.waterfall(
    [
      (done) => {
        User.findOne(
          { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
          (err, user) => {
            if (!user) {
              req.flash('error', 'Password reset token is invalid or has expired.');
              return res.redirect('back');
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save((err) => {
              req.logIn(user, (error) => {
                done(error, user);
              });
            });
          }
        );
      },
      (user, done) => {
        const options = {
          auth: {
            api_user: 'jmorazano',
            api_key: 'Raimundos2909!',
          },
        };

        const smtpTransport = nodemailer.createTransport(sgTransport(options));
        const mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text:
            'Hello,\n\n' +
            'This is a confirmation that the password for your account ' +
            user.email +
            ' has just been changed.\n',
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      },
    ],
    (err) => {
      res.redirect('/');
    }
  );
};
