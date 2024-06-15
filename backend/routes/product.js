const express = require('express');
const router = express.Router();
const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct , createProductReviews, getProductReviews,
    deleteReviews
 } = require('../controllers/productController');

const { isAuthenticated,  authorizedRoles} = require('../middleWares/auth')
router.route('/products').get(getProducts);

router.route('/admin/product/new').post(isAuthenticated, authorizedRoles('admin'), newProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id')
.put(isAuthenticated, authorizedRoles('admin'), updateProduct)
.delete(isAuthenticated, authorizedRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticated,  createProductReviews);
router.route('/reviews').get(isAuthenticated,  getProductReviews);
router.route('/reviews').delete(isAuthenticated,  deleteReviews);


module.exports = router;