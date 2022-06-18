const bcrypt = require('bcrypt');
const Admin = require('../models/adminModels');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const getAdmins = async (req, res) => {
    const admin = await Admin.find({Admin});
    await res.json(admin).status(200);
}


const registerAdmins = asyncHandler(async(req, res) => {
    const { firstName, lastName, email, password, birthday} = req.body;
        if(!firstName || !lastName || !email || !password){
            res.send(400);
            throw new Error("Please fill all fields");
        };

        //Checking if the admin with that email already exist
        const adminExist = await Admin.findOne({email});
            if(adminExist){
                res.status(400)
                throw new Error("Admin with this email already exist");
            }
        //hashing of the password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Here we are creating a new admin in absence of the admin email already registered and including the model.
        const admin = await Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthday
        });

        //here we are checking to know if the admin was created successfully. and then we are returning the value back in json
        if(admin){
            res.status(200).json({
                _id: admin.id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                birthday: admin.birthday,
            })
        }else{
            res.status(400)
            throw new Error("Invalid submition");
        }
        await admin.save();
});

        //we are getting a particular admin

const getAdminById = asyncHandler(async(req, res) => {
    const { id } = req.params;
    let admin = await Admin.find({id});
        if(id){
            res.send(admin).status(200);
        }
        else res.send("No record found");

});


const deleteAdmin = asyncHandler(async(req, res) => {
    const { id } = req.params;
    await Admin.deleteOne({ id })
        if(id){
            res.send("Admin deleted successfully");
        }
        else {
            res.send("invalide Admin");
        }
});


const putAdmin = asyncHandler(async(req, res) => {
    const { id } = req.params;
    let admin = await Admin.findByIdAndUpdate({id : _id})
        if(admin.id === id){
            res.status(200).json("Updated succesfully ")
        }
        else{
            res.send("Invaid user !")
        }
});

const signInAdmins = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Incorrect Form Submission");
        }
        let admin = await Admin.findOne({email: email})
        const match = await bcrypt.compare(password, admin.password)
            if(!match){
                res.send("invalid Admin login")
            }
            else {
                res.send(admin);
            }
});

module.exports = {
    getAdmins,
    registerAdmins,
    getAdminById,
    deleteAdmin,
    putAdmin,
    signInAdmins,
}