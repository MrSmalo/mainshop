const Categories = require('../models/CategoriesModel')
const Products = require('../models/ProductsModel')


const postCategorie = async (req,res) =>{
    try{
        var Category = new Categories({
            name: req.body.name,
            description: req.body.categorieDescription
      })
      const product = req.body.product

      product.forEach(element => {
        const addProduct = new Products({
            
        })
      });

    } 
    catch(error){

    }
}