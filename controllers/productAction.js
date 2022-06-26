const asyncHandler = require('express-async-handler');
const Product = require('../models/productsmodels');


// @desc  Get products
// @routes GET /products
// @access public
const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.find();
    res.json(product).status(200);
});

// @desc  Update products
// @routes PUT /products/:id 
// @access public
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(400);
        throw new Error("product not found");
    }
    //the "new true" created, is to create a new product if we dont find any...
   const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updateProduct);
});

// @desc  Post products
// @routes POST /products
// @access public
const postProduct = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please select a product');
    }
    const product = await Product.create({
        text: req.body.text,
    });

    res.status(200).json(product);
});

// @desc  Delete products
// @routes DELETE /products/:id
// @access public
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error(" Product not found !");
    }
    await product.remove()
    res.status(200).json({id: req.params.id});
});


module.exports = {
    getProduct,
    updateProduct,
    postProduct,
    deleteProduct,
};