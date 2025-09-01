const express = require('express');
const router = express.Router();


const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserProfile, updatePassword,
    updateUserProfile, allUsers, getUserDetailAdmin, updateAdminProfile, deleteUserProfile
 } = require('../controllers/authController');
const { isAuthenticated, authorizedRoles} = require('../middleWares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logOut);

router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/password/update').put(isAuthenticated, updatePassword);
router.route('/me/update').put(isAuthenticated, updateUserProfile);

router.route('/admin/user/:id')
.get(isAuthenticated, authorizedRoles('admin'), getUserDetailAdmin)
.put(isAuthenticated, authorizedRoles('admin'), updateAdminProfile)
.delete(isAuthenticated, authorizedRoles('admin'), deleteUserProfile)
;
router.route('/admin/users').get(isAuthenticated, authorizedRoles('admin'), allUsers);



module.exports = router;