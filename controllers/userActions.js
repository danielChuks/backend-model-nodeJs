const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


//user route controller functions
/**
 * 
 * @param {*} req this function req, reqest the all the users listed 
 * @param {*} res we respond to the clients all the users from th*
 */
const getUsers = async(req, res) => {
    const user = await User.find({User});
    await res.json(user).status(200);
}

/**
 * 
 * @param {*} req //this route get users by id ..i.e getting one user instead of getting all users 
 * @param {*} res //we  respond the user if the id passed in by the user matches the id in the database.
 */
const getUsersById = asyncHandler(async(req, res) => {
        const { id } = req.params
        let user = await User.find({_id : id});
            if(id){
                res.send(user).status(200);
    }
             else{
                res.send('No user exist');
    } 
})
/**
 * 
 * @param {*} req this function enable the clients make request to signup and  the function first check if the user already exist if it does it will return this user already exist.
 * @param {*} res then respond depending if the user exist will respond "user with  email already exist" 
 * @returns else it will create a new user and responed "User created" and then save....
 */
const registerUsers =  asyncHandler(async(req, res) =>{
    const { name, email, password} = req.body
        let user = await User.findOne({email: email})
        if(user) return res.status(400).send("User with these email already exist")// stop here if user exist

        //creating as new user...
        user = new User( { name, email, password})
        const salt = await bcrypt.genSalt(10)//create the hash
        user.password = await bcrypt.hash(user.password, salt)//hash the password
        await user.save()

        res.send("user created");
});
/**
 * 
 * @param {*} req in this function, we request user by "id" and perform a delete action 
 * @param {*} res we respond the status of the delete action to the user if ther exsist a user.
 */
const deleteUsers = asyncHandler(async(req, res) => {
    const { id } = req.params
    await User.deleteOne({id: id})
    if(id){
        res.send("Deleted successfully")
    }
    else{
        res.send("No user to delete")
    }
});

/**
 * 
 * @param {*} req we request a user for update 
 * @param {*} res respond the status of the update 
 */
const putUsers = asyncHandler(async(req, res) =>{
    const { id } = req.params
    let user = await User.findByIdAndUpdate({id: id})
    if(user.id === id){
        res.send("deleted successfully")
    }else{
        res.send("invailed user")
    }
});
/**
 * 
 * @param {*} req This will take the request of password and email.
 * @param {*} res this respond to the user an invalid user if the email and password provided by the user is invalid and return users information if email and password in correct 
 * @returns we return "incorrect form submission" if the user does not fill in any information in the email n password filled
 */
const signInUsers = asyncHandler(async(req, res) => {
    const {email, password } = req.body;
        if(!email || !password){
            return res.status(400).json('Incorrect form submission')
         }
         let user = await User.findOne({email: email})
         const match = await bcrypt.compare(password, user.password) 
            if(!match){
                res.send("invalid User")
            }
            else{
                res.send(user)
            }
});


module.exports = {
    getUsers,
    registerUsers,
    deleteUsers, 
    signInUsers,
    putUsers,
    getUsersById
}