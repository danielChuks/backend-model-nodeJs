const bcrypt = require('bcrypt');
const Admin = require('../models/adminModels');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');


const getAdmins = async (req, res) => {
    const admin = await Admin.find({Admin});
    await res.json(admin).status(200);
}


//we are getting a particular admin.................................
const getAdminById = asyncHandler(async(req, res) => {
    const { id } = req.params;
    let admin = await Admin.find({_id : id});
        if(id){
            res.send(admin).status(200);
            }
            else res.send("No record found");  
        });
/**
 * Admin registration function...................................
 */
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
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthday
        });
        await newAdmin.save();
        res.status(200).json({
            _id: newAdmin.id,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            email: newAdmin.email,
            birthday: newAdmin.birthday,
            token: generateToken(newAdmin._id)
            })
        res.status(400)
        throw new Error("Invalid submition");
});

//login fuction ............................................
const signInAdmins = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Incorrect Form Submission");
        }
    const admin = await Admin.findOne({email})
        if(!admin){
            res.status(404);  
            throw new Error("Admin Not Found !")          
         }

    const validPassword = await bcrypt.compare(password, admin.password);
        if(!validPassword){
            res.status(400)
            throw new Error(" Invalid Password !");
        }
            res.json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin._id)
        })
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

const updateAdmin = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const {firstName, lastName, email, birthday } = req.body;
    const admin = await Admin.findById({_id : id })
        if(!admin){
            res.status(404)
            throw new Error("No Admin Found !")
        }
        admin.firstName = firstName || admin.firstName;
        admin.lastName = lastName || admin.lastName;
        admin.email = email || admin.email;
        admin.birthday = birthday || admin.birthday;
        await admin.save();
        res.send(admin);
});

//JWT token ..............................................
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
 };

//  {
//     "firstName" : "uzum",
//     "lastName": "naruto",
//     "email": "naruto@gmail.com",
//     "password": "12345",
//     "birthday": "30/12/1994"
// }



module.exports = {
    getAdmins,
    registerAdmins,
    getAdminById,
    deleteAdmin,
    updateAdmin,
    signInAdmins,
}