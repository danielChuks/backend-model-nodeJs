const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 3, maxlength: 200},
    lastName: {type: String, required: true, minLength: 3, maxlength: 200},
    birthday: { type: String , required: true},
    email: {type: String, required: true, minlength: 6, maxlength: 200, unique: true},

    password: {type: String, minlength: 8, maxlength: 1024},
    
})


module.exports = mongoose.model('Admin', adminSchema);