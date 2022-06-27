const express = require('express');
const router = express.Router();

//We import the function that get called when the navigate to the following routes.
const { getProduct, updateProduct, postProduct, deleteProduct } = require("../controllers/productAction");

const { auth } = require('../middleWare/authorization');
      

router.get('/', auth, getProduct);
router.post('/', auth, postProduct);
router.get('/:id', auth, deleteProduct);
router.put('/:id', auth, updateProduct);




module.exports = router;