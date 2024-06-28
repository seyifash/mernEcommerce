const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brandName: {
        type: String,
        required: [true, 'Please enter product Brand'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    name: {
        type: String,
        required: [true, 'Please enter product Name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        trim: true,
        maxLength: [30, 'Price cannot exceed 30 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:  [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                 type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Perfumes',
                'Deodorant',
                'Roll on',
                'Body spray',
                'Women',
                'Men',
                'Kids'
            ],
            message: 'Please select correct category for product',
        }
    },
    seller: {
        type: String,
        required: [true, 'Please Enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [10, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
    
})


module.exports = mongoose.model('product', productSchema);