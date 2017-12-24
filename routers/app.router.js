const router = require('express').Router();
const appController = require('../controllers/app.controller.js');
const accountController = require('../controllers/account.controller.js');

// -------------------- ODR blog test --------------------
router.get('/', appController.odr);
router.get('/user/:username', appController.userPosts);

// create a blog post
router.get('/write', accountController.ensureAuthenticated, appController.write);
router.post('/write', accountController.ensureAuthenticated, appController.writePost);

// edit a blog post
router.get('/edit/:blog_id', accountController.ensureAuthenticated, appController.edit);
router.post('/edit/:blog_id', accountController.ensureAuthenticated, appController.writePost);

module.exports = router;
