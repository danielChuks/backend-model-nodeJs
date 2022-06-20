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

        product_name: {type: String, required: true, minlength: 3, maxlength: 200},
        product_price: {type: Number, required: true},
        product_quantity: {type: Number, required: true}
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model("Product", productSchema);