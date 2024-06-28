const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleWares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// We create a new product here => /api/v1/product/new

const newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    })
}) 


// Get all products => /api/v1/products

const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter().
    pagination(resPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productCount,
        products
    })

})

// get single product details => /api/v1/product/:id

const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }


        res.status(200).json({
            success: true,
            product
        })
})

//update product  by id  => /api/v1/products/:id

const updateProduct = catchAsyncErrors(async (req, res, next) => {

    let  product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//   delete product  => /api/v1/admin/product/:id

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    await Product.deleteOne({ _id: product._id });

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})


// create new review => /api/v1/review

const createProductReviews = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )
    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save({ validateBeforeSave: false})

    res.status(200).json({
        success: true
    })

})


// get Product reviews => api/v1/reviews

const getProductReviews = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// delete Product reviews => api/v1/reviews

const deleteReviews = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;

    const ratings = product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

module.exports = { getProducts, newProduct, getSingleProduct,
     updateProduct,
    deleteProduct,
    createProductReviews, getProductReviews, deleteReviews}