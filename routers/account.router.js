const router = require('express').Router();
const accountController = require('../controllers/account.controller.js');

// Route file for login, register and logout
const passport = require('passport');

// -------------------- User login auth --------------------
// login GET + POST
router.get('/login', accountController.login);
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  accountController.login_post
);

// register GET + POST
router.get('/register', accountController.register);
router.post('/register', accountController.register_post);

// Forgot password
router.get('/forgot', accountController.forgot);
router.post('/forgot', accountController.forgot_post);

// Reset password
router.get('/reset/:token', accountController.resetPass);
router.post('/reset/:token', accountController.resetPassPost);

// logout
router.get('/logout', accountController.logout);

module.exports = router;
