const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/userActions');

/* Working with the route. */
router.get('/', controllerUsers.getUsers);
router.post('/register', controllerUsers.registerUsers);
router.delete('/:id', controllerUsers.deleteUsers);
router.put('/:id', controllerUsers.updateUsers);
router.get('/:id', controllerUsers.getUsersById);
router.post('/signin', controllerUsers.signInUsers);





module.exports = router