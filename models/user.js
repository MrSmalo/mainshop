const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
