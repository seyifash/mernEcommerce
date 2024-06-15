const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleWares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')


const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name , email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample_image_id_c',
            url: 'https://example.com/image_c.jpg'
        }
    })

    sendToken(user, 200, res)
})



// login user

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('please enter email and password', 400))
    }

    // 
    const user = await User.findOne({email}).select(' +password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or password', 401))
    }

    // check if password is correct or not 
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid Email or password', 401))
    }

    sendToken(user, 200, res)
})

// Forgot password => /api/v1/password/forgot

const forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    }
    // get reset token

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    // create reset password url 

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow"\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'Shoppers Password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to : ${user.email}`
        })
    } catch(error){
        user.resetPasswordToken = undefined;
        User.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false})
        return next( new ErrorHandler(error.message, 500))
    }
})

// Reset password  => /api/v1/password/reset/:token

const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // hash URL token

    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined

    await user.save();
    sendToken(user, 200, res)
})

// Get currently logged in user details => /api/user

const getUserProfile = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// update / change password => /api/v1/password/update
const updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // check previous password

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect', 400))
    }

    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res)
})

// update user profile => /api/v1/me/update
const updateUserProfile = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar: TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

// logout a user by clearing the token in the cookie
const logOut = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Admin Routes


// Get all users => /api/v1/admin/users

const allUsers = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details => /api/v1/admin/user/:id

const getUserDetailAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


// update admin user profile => /api/v1/admin/user/:id
const updateAdminProfile = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //update avatar: TODO
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

// update admin user profile => /api/v1/admin/user/:id
const deleteUserProfile = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user not found with id: ${req.params.id}`))
    }

    // remove avatar from cloudinary - TODO

    await user.deleteOne();
    res.status(200).json({
        success: true,
        user
    })

})

module.exports = { registerUser, loginUser, logOut, forgotPassword,
    resetPassword, getUserProfile, updatePassword, updateUserProfile,
    allUsers, getUserDetailAdmin, updateAdminProfile, deleteUserProfile
 };