const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Validation: name is required']
  },
  description: {
    type: String,
  },
  //  products:
  //  [{type: mongoose.Schema.Types.ObjectId, ref: Product}]
},{
    timestamps: true,
});

module.exports = mongoose.model('Categories', CategorySchema);