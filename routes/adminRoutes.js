const express = require('express');
const router = express.Router()
const controllerAdmins = require('../controllers/adminActions')


router.get('/', controllerAdmins.getAdmins);
router.post('/', controllerAdmins.postAdmins);
router.get('/:id', controllerAdmins.getAdminById)
router.delete('/:id', controllerAdmins.deleteAdmin)





module.exports = router;