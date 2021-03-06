const router = require('express').Router();
const appController = require('../controllers/app.controller.js');
const accountController = require('../controllers/account.controller.js');

// -------------------- ODR blog test --------------------
router.get('/', appController.odr);
router.get('/user/:username', appController.userPosts);

// create a blog post
router.get('/write', accountController.ensureAuthenticated, appController.write);
router.post('/write', accountController.ensureAuthenticated, appController.writePost);

// create company
router.get('/new-company', accountController.ensureAuthenticated, appController.newCompany);
router.post('/new-company', accountController.ensureAuthenticated, appController.CompanyPost);

// edit a company
router.get('/company/edit/:company_id', accountController.ensureAuthenticated, appController.companyEdit);
router.post('/company/edit/:company_id', accountController.ensureAuthenticated, appController.CompanyPost);

// edit a blog post
router.get('/edit/:blog_id', accountController.ensureAuthenticated, appController.edit);
router.post('/edit/:blog_id', accountController.ensureAuthenticated, appController.writePost);

module.exports = router;
