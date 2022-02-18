const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/userFiles')

/* Working with the route. */
router.get('/', controllerUsers.getUsers)
router.post('/', controllerUsers.postUsers)
router.delete('/:id', controllerUsers.deleteUsers)
router.put('/:id', controllerUsers.postUsers)
router.get('/:id', controllerUsers.getUsersById)
router.post('/signin', controllerUsers.signInUsers)





module.exports = router;