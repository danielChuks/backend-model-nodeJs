const express = require('express');
const router = express.Router();

const {getAdmins, getAdminById, registerAdmins, deleteAdmin, updateAdmin, signInAdmins} = require('../controllers/adminActions');

router.get('/', getAdmins);
router.route('/:id').get(getAdminById).delete(deleteAdmin).put(updateAdmin);
router.post('/register', registerAdmins);
router.post('/signin', signInAdmins);





module.exports = router;