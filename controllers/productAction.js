const asyncHandler = require('express-async-handler');
const Product = require('../models/productsmodels');

// @desc  Get products
// @routes GET /products
// @access public
const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.find({Product});
    res.json(product).status(200);
});

// @desc  Update products
// @routes PUT /products/:id
// @access public
const updateProduct = asyncHandler(async(req, res) => {
    const {id} = req.params;
    let product = await Product.findByIdAndUpdate({id});
    if(product.id == id){
        res.send("updated successfully");
    }else{
        res.send("invalid product");
    }
});

// @desc  Post products
// @routes POST /products
// @access public
const postProduct = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "post product"
    });
});

// @desc  Delete products
// @routes DELETE /products/:id
// @access public
const deleteProduct = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "deleted successfully"
    });
});


module.exports = {
    getProduct,
    updateProduct,
    postProduct,
    deleteProduct,
};