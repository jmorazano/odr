const router = require('express').Router();
const appController = require('../controllers/app.controller.js');
const accountController = require('../controllers/account.controller.js');

// -------------------- ODR blog test --------------------
router.get('/', appController.odr);
router.get('/user/:username', appController.userPosts);

// create a claim
router.get('/write/:company_id', accountController.ensureAuthenticated, appController.write);
// router.post('/write', accountController.ensureAuthenticated, appController.writePost);
router.get('/congrats', accountController.ensureAuthenticated, appController.writeCongrats);

// remove claim
router.get('/remove/:claim_id', accountController.ensureAuthenticated, appController.removeClaim);

// create company
router.get('/new-company', accountController.ensureAuthenticated, appController.newCompany);
router.post('/new-company', accountController.ensureAuthenticated, appController.companyPost);

// create category
router.get('/categories/new-category', accountController.ensureAuthenticated, appController.newCategory);
router.post('/categories/new-category', accountController.ensureAuthenticated, appController.categoryPost);

// edit categories
router.get('/categories', accountController.ensureAuthenticated, appController.getCategories);
router.get('/categories/edit/:category_id', accountController.ensureAuthenticated, appController.categoryEdit);
router.post('/categories/edit/:category_id', accountController.ensureAuthenticated, appController.categoryPost);

// edit a company
router.get('/company/edit/:company_id', accountController.ensureAuthenticated, appController.companyEdit);
router.post('/company/edit/:company_id', accountController.ensureAuthenticated, appController.companyPost);

// edit a blog post
router.get('/edit/:claim_id', accountController.ensureAuthenticated, appController.edit);
router.post('/edit/:claim_id', accountController.ensureAuthenticated, appController.writePost);

module.exports = router;
