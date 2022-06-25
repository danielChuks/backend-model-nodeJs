const express = require('express');
const router = express.Router();

//We import the function that get called when the navigate to the following routes.
const { getProduct,
        updateProduct,
        postProduct,
        deleteProduct } = require("../controllers/productAction");
      

router.route('/', getProduct);
router.post('/', postProduct);
router.get('/:id', deleteProduct);
router.put('/:id', updateProduct);




module.exports = router;