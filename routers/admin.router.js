const router = require('express').Router();
const adminController = require('../controllers/admin.controller.js');
const { ensureAuthenticated } = require('../controllers/account.controller.js');

// -------------------- Admin --------------------
router.get('/:username', ensureAuthenticated, adminController.adminRoot);

router.get('/:username/claims', ensureAuthenticated, adminController.userClaims);
router.get('/:username/claims/:claim_id', ensureAuthenticated, adminController.claimDetail);
router.get('/:username/reputation', ensureAuthenticated, adminController.reputation);
router.get('/:username/help', ensureAuthenticated, adminController.help);
router.get('/:username/user-configuration', ensureAuthenticated, adminController.userConfig);

module.exports = router;
