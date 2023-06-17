const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    // category: 
    //     [{type: mongoose.Schema.Types.ObjectId, ref: Category}]
    
},{
    timestamps: true,
});

module.exports = mongoose.model('Products', ProductsSchema);