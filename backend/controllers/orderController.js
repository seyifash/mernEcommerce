const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleWares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')

// create a new order => /api/v1/order/new

const newOrder = catchAsyncErrors( async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    })
})


// Get a single order  => /api/v1/order/:id

const getSingleOrder = catchAsyncErrors( async (req,res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler('No order found with this Id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get a logged in user order  => /api/v1/orders/me

const getCurrentUserOrders = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        order
    })
})


// Get all orders => /api/v1/admin/orders/
const getAllOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount +=order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update / process orders => /api/v1/admin/orders/:id
const updateOrders = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('you have already delivered this order', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    });

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    order.save()

    res.status(200).json({
        success: true,
    })
})


async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock = product.stock - quantity

    await product.save({ validateBeforeSave: false})
}

const deleteOrders = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next( new ErrorHandler('No Order found with this user ID', 404))
    }

    await order.deleteOne()

    res.status(200).json({
        success: true,
    })
})


module.exports = { newOrder, getSingleOrder, getCurrentUserOrders, getAllOrders, updateOrders,
    deleteOrders
}