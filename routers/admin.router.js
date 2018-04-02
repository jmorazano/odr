const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js');
const accountController = require('../controllers/account.controller.js');

// -------------------- Admin --------------------
router.get('/:username', accountController.ensureAuthenticated, adminController.adminRoot);

router.get('/:username/claims', accountController.ensureAuthenticated, adminController.userClaims);
router.get('/:username/reputation', accountController.ensureAuthenticated, adminController.reputation);
router.get('/:username/help', accountController.ensureAuthenticated, adminController.help);
router.get('/:username/user-configuration', accountController.ensureAuthenticated, adminController.userConfig);

module.exports = router;
