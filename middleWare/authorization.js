const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModels');

const auth = asyncHandler(async( req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //getting the token............................
            token = req.headers.authorization.split(' ')[1];
    console.log('this is token', token)

            //Verifying the token ........................
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('this is decoded', decoded)


            //get admin from the token....................
            req.admin = await Admin.findById(decoded.id).select('password');
    console.log('this is  req ', req.admin);

        next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized  !");
        };
    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized, No token !");
    };

});




module.exports = { auth };