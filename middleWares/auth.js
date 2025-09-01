const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// checks if  a user is authenticated or not

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next()
})
// handling users roles 

const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}

module.exports = { isAuthenticated, authorizedRoles };