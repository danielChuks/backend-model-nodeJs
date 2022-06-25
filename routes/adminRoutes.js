const express = require('express');
const router = express.Router();

const { getAdmins, 
        getAdminById, 
        registerAdmins,
        deleteAdmin, 
        updateAdmin, 
        signInAdmins} = require('../controllers/adminActions');

const { protect } = require('../middleWare/authorization')

router.get('/', protect, getAdmins);
router.delete('/:id', deleteAdmin);
router.put('/:id', updateAdmin);
router.get('/:id', getAdminById);
router.post('/register', registerAdmins);
router.post('/signin', signInAdmins);





module.exports = router;