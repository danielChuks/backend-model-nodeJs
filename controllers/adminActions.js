const bcrypt = require('bcrypt');
const Admin = require('../models/adminModels')

const getAdmins = async (req, res) => {
    const admin = await Admin.find({Admin})
    await res.json(admin).status(200);
}


const postAdmins = async (req, res) => {
    const { firstName, lastName, email, password, birthday} = req.body;
        //Checking if the admin with that email already exsist
        let admin = await Admin.findOne({email: email});
            if(admin) return res.status(400).send("Admin with this email already exist");

        //Here we are creating a new admin in absence of the admin email already registered.
        admin = new Admin({firstName, lastName, email, password, birthday});
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        await admin.save();

        res.send("Admin added")
}


const getAdminById = async (req, res) => {
    const { id } = req.params;
    let admin = await Admin.find({id});
        if(id){
            res.send(admin).status(200);
        }
        else res.send("No record found");
            
}


const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    await Admin.deleteOne({ id })
        if(id){
            res,send("Admin deleted successfully");
        }

        else {
            res.send("invalide Admin");
        }
}


module.exports = {
    getAdmins,
    postAdmins,
    getAdminById,
    deleteAdmin,
}