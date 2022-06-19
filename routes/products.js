const express = require('express');
const router = express.Router();

const controllerProduct = require("../controllers/productController");


router.getProduct('/', controllerProduct.getProduct)


module.export = router;