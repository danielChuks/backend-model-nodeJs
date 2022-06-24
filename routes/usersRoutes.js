const express = require('express');
const router = express.Router();

const {
       getUsers,
       registerUsers,
       deleteUsers,
       updateUsers,
       getUsersById,
       signInUsers } = require('../controllers/userActions')

/* Working with the route. */
router.get('/', getUsers);
router.get('/:id', getUsersById);
router.delete('/:id', deleteUsers);
router.post('/register', registerUsers);
router.post('/login', signInUsers);
router.put('/:id', updateUsers);






module.exports = router;