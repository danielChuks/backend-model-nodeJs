const asyncHandler = require('express-async-handler');
const Post = require('../models/postsModels');
const admin = require('../models/adminModels');


// @desc  Get posts
// @routes GET /posts
// @access private
const getPost = asyncHandler(async(req, res) => {
    const post = await Post.find({ admin: req.admin.id });
    res.json(post).status(200);
});

// @desc  Update posts
// @routes PUT /post
// @access private
const updatePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error("post not found");
    }
    const admin = await admin.findById(req.admin.id);
    //check for admin.........
    if(!admin){
        res.status(404);
        throw new Error("Admin Not Found");
    }
    //make sure only the logged in admin matches the goal admin...............
    if(post.admin.toString() !== admin.id){
        res.status(401)
        throw new Error("Admin not Authorized");
    };
    //the "new true" created, is to create a new post if we dont find any...
   const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updatePost);
});

// @desc  Post posts
// @routes POST /posts
// @access public
const postPost = asyncHandler(async(req, res) => {
    const {text} = req.body
    if(!req.body.text){
        res.status(400)
        throw new Error('Please select a post');
    }
    const post = await Post.create({
        text,
        admin: req.admin.id
    });

    res.status(200).json(post);
});

// @desc  Delete posts
// @routes DELETE /posts/:id
// @access private
const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error(" Post not found !");
    }
    const admin = await admin.findById(req.admin.id);
    //check for admin.........
    if(!admin){
        res.status(404);
        throw new Error("Admin Not Found");
    }
    //make sure only the logged in admin matches the goal admin...............
    if(post.admin.toString() !== admin.id){
        res.status(401)
        throw new Error("Admin not Authorized");
    };
    await post.remove();
    res.status(200).json({id: req.params.id});
});


module.exports = {
    getPost,
    updatePost,
    postPost,
    deletePost,
};