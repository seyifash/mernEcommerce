const express = require('express');
const router = express.Router();


const { newOrder, getSingleOrder, getCurrentUserOrders, getAllOrders, updateOrders, deleteOrders  } = require('../controllers/orderController');
const { isAuthenticated, authorizedRoles} = require('../middleWares/auth')


router.route('/order/new').post(isAuthenticated, newOrder);
router.route('/order/:id').get(isAuthenticated, getSingleOrder);
router.route('/orders/me').get(isAuthenticated, getCurrentUserOrders);
router.route('/admin/orders').get(isAuthenticated, authorizedRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticated, authorizedRoles('admin'), updateOrders)
.delete(isAuthenticated, authorizedRoles('admin'), deleteOrders);


module.exports = router;