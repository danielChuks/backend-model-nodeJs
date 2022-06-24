const mongoose = require('mongoose');

const productSchema = mongoose.Schema(

    {
        //we are linking users to products to know which user picks which products
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        admin:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Admin"
        },

        text: {type: String, required: true, minlength: 3, maxlength: 200},
    },
    {
        timestamps: true
    }
)
 


module.exports = mongoose.model("Product", productSchema);