const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Validation: name is required'],
    unique: true
  },
  description: {
    type: String,
  },
   products:
   [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
},{
    timestamps: true,
});

module.exports = mongoose.model('Categories', CategorySchema);