const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
         description:{
            type: String,
            default: "Not Provided"
        },
         categories:{
            type: String,
            enum:["clothes", "gadgets", "makeup", "electronics","footware", "others"],
            default: "others"
        },
         price:{
            type: Number,
            required: true,
            default: 0
        }

    }
)
const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel
