var express = require('express')
  , router = express.Router();
  
// *****  USER   ********
router.use('/users', require('./user/user'));
router.use('/checksignup', require('./user/checkSignUp'));
router.use('/login', require('./user/login'));
router.use('/changepassword', require('./user/changePassword'));
router.use('/makerequestresetpassword', require('./user/resetPassword'));
router.use('/resetpassword', require('./user/verifyResetPassword'));
router.use('/newsignup', require('./user/newSignup'));
router.use('/useraddress', require('./user/addAddress'));

// *****  PRODUCT   ********
router.use('/bcode', require('./product/details_bcode'));


// *****  ORDER   ********
router.use('/orders', require('./order/order'));

// *****  Apoint   ********
router.use('/apoint', require('./apoint/list_apoint'));

module.exports = router;