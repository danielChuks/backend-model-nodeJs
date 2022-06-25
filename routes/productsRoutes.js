const express = require('express');
const router = express.Router();

//We import the function that get called when the navigate to the following routes.
const { getProduct,
        updateProduct,
        postProduct,
        deleteProduct } = require("../controllers/productAction");

const { protect } = require('../middleWare/authorization');
      

router.get('/', protect, getProduct);
router.post('/', protect, postProduct);
router.get('/:id', protect, deleteProduct);
router.put('/:id', protect, updateProduct);




module.exports = router;