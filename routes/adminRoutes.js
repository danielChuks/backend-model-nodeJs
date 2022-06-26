const express = require('express');
const router = express.Router();

const { getAdmins, 
        getAdminById, 
        registerAdmins,
        deleteAdmin, 
        updateAdmin, 
        signInAdmins} = require('../controllers/adminActions');

const { auth } = require('../middleWare/authorization')

router.get('/', auth, getAdmins);
router.delete('/:id' , deleteAdmin);
router.put('/:id', updateAdmin);
router.get('/:id', auth, getAdminById);
router.post('/register', registerAdmins);
router.post('/signin', signInAdmins);





module.exports = router;