const express = require('express');
const router = express.Router();

//We import the function that get called when the navigate to the following routes.
const { getPost, updatePost, postPost, deletePost } = require("../controllers/postAction");

// const { auth } = require('../middleWare/authorization');
const { authUser } = require('../middleWare/authorization')
      

router.get('/', authUser, getPost);
router.post('/', authUser, postPost);
router.get('/:id', authUser, deletePost);
router.put('/:id', authUser, updatePost);




module.exports = router;