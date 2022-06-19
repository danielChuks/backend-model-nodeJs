const asyncHandler = require('express-async-handler');
const Product = require('../models/productsmodels')


const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        res.send(400)
        throw new Error('No product was found');
    }
})




module.exports = {
    getProduct,
}