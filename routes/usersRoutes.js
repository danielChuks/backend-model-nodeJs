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
router.post('/register', registerUsers);
router.post('/signin', signInUsers);
router.route('/:id').delete(deleteUsers).put(updateUsers).get(getUsersById);







module.exports = router;