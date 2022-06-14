const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {type: String, required: true, minlength: 3, maxlength:200},

    email: {type: String, required: true, minlength: 6, maxlength:200, unique: true},

    password: {type: String, minlength: 6, maxlength: 1024},

})



module.exports = mongoose.model('User', userSchema)