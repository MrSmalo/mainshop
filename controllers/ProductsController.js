//requires for models
const Categories = require('../models/CategoriesModel')
const Products = require('../models/ProductsModel')

const postProducts = async (req,res) =>{
    try{
        const Product = await Products.create({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
         // category: req.body.category
        })

        res.status(200).json(Product);
      }
      catch(error){
        res.status(400).json(error);
        console.log(error)
      } 
}

module.exports = {
    postProducts,
}