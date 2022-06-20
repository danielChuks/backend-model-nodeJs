const express = require('express');
const router = express.Router();

//We import the function that get called when the navigate to the following routes.
const { getProduct,
        updateProduct,
        postProduct,
        deleteProduct } = require("../controllers/productAction");
      
router.route('/').get(getProduct).post(postProduct);
router.route('/:id').delete(deleteProduct).put(updateProduct);



module.exports = router;