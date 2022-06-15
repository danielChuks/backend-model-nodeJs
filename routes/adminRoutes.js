const express = require('express');
const router = express.Router()
const controllerAdmins = require('../controllers/adminActions')


router.get('/', controllerAdmins.getAdmins);
router.post('/', controllerAdmins.postAdmins);
router.get('/:id', controllerAdmins.getAdminById);
router.delete('/:id', controllerAdmins.deleteAdmin);
router.put('/:id', controllerAdmins.putAdmin);
router.post('/signin', controllerAdmins.signInAdmins)





module.exports = router;