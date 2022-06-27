const asyncHandler = require('express-async-handler');
const Product = require('../models/productsmodels');
const admin = require('../models/adminModels');


// @desc  Get products
// @routes GET /products
// @access private
const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.find({ admin: req.admin.id });
    res.json(product).status(200);
});

// @desc  Update products
// @routes PUT /products/:id 
// @access private
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error("product not found");
    }
    const admin = await admin.findById(req.admin.id);
    //check for admin.........
    if(!admin){
        res.status(404);
        throw new Error("Admin Not Found");
    }
    //make sure only the logged in admin matches the goal admin...............
    if(product.admin.toString() !== admin.id){
        res.status(401)
        throw new Error("Admin not Authorized");
    };
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
        admin: req.admin.id
    });

    res.status(200).json(product);
});

// @desc  Delete products
// @routes DELETE /products/:id
// @access private
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error(" Product not found !");
    }
    const admin = await admin.findById(req.admin.id);
    //check for admin.........
    if(!admin){
        res.status(404);
        throw new Error("Admin Not Found");
    }
    //make sure only the logged in admin matches the goal admin...............
    if(product.admin.toString() !== admin.id){
        res.status(401)
        throw new Error("Admin not Authorized");
    };
    await product.remove();
    res.status(200).json({id: req.params.id});
});


module.exports = {
    getProduct,
    updateProduct,
    postProduct,
    deleteProduct,
};