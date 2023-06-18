const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    categories: 
         [{type: mongoose.Schema.Types.ObjectId, ref: 'Categories'}],
    
},{
    timestamps: true,
});

module.exports = mongoose.model('Products', ProductsSchema);