const router = require('express').Router();
const appController = require('../controllers/app.controller.js');
// route file for login, register and logout
const account = require('./account');
const passport = require('passport');

// App Router
router.get('/', appController.root);

router.get('/search', appController.search);

router.get('/items/:id', appController.items);

router.get('/suggest', appController.suggest);

// -------------------- ODR blog test --------------------
router.get('/odr', appController.odr);
router.get('/user/:username', appController.userPosts);

// create a blog post
router.get('/write', account.ensureAuthenticated, appController.write);
router.post('/write', account.ensureAuthenticated, appController.writePost);

// edit a blog post
router.get('/edit/:blog_id', account.ensureAuthenticated, appController.edit);
router.post('/edit/:blog_id', account.ensureAuthenticated, appController.writePost);

// -------------------- User login auth --------------------
// login GET + POST
router.get('/login', account.login);
router.post('/login', passport.authenticate('local'), account.login_post);

// register GET + POST
router.get('/register', account.register);
router.post('/register', account.register_post);

// logout
router.get('/logout', account.logout);
// -------------------- /User login auth --------------------

module.exports = router;
