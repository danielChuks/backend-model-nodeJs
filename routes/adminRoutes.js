const express = require('express');
const router = express.Router()
const controllerAdmins = require('../controllers/adminActions')


router.get('/', controllerAdmins.getAdmins);
router.post('/', controllerAdmins.postAdmins);





module.exports = router;