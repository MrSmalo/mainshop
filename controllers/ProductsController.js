const Categories = require('../models/CategoriesModel');
const Products = require('../models/ProductsModel');

const postProducts = async (req, res) => {
  let product;

  try {
    // Create a new product with the provided data
    product = new Products({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    if (req.body.category) {
      const categories = req.body.category;
      const updatedCategories = [];

      // Iterate over each category in the request
      for (const element of categories) {
        let category;

        try {
          // Find or create the category using findOneAndUpdate with upsert option
          category = await Categories.findOneAndUpdate(
            { name: element },
            { $push: { products: product._id } },
            { upsert: true, new: true }
          );

          // Push the updated category's _id to the updatedCategories array
          updatedCategories.push(category._id);
        } catch (error) {
          // If an error occurs, re-throw the error to be caught in the outer catch block
          throw error;
        }
      }

      // Update the product's categories with the updatedCategories array
      product.categories = updatedCategories;
    }

    // Save the product
    await product.save();

    // Send the response with the saved product
    res.status(200).json(product);
  } catch (error) {
    if (error.code === 11000) {
      // If a uniqueness constraint violation error occurs, remove the product ID from associated categories
      await Categories.updateMany(
        { _id: { $in: product.categories } },
        { $pull: { products: product._id } }
      );
    }

    // Send the error response
    res.status(400).json(error);
    console.log(error);
  }
};

module.exports = {
  postProducts,
};
