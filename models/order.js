// =========================================
// FASTSMS ORDER MODEL
// CLEAN VERSION
// =========================================

const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({


    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },



    phoneNumber: {

        type: String,

        default: "Gözlənilir"

    },



    country: {

        type: String,

        required: true

    },



    service: {

        type: String,

        required: true

    },



    price: {

        type: Number,

        required: true,

        default: 0

    },



    status: {

        type: String,

        enum:[
            "waiting",
            "active",
            "completed",
            "cancelled"
        ],

        default:"waiting"

    },



    smsCode: {

        type:String,

        default:null

    },
    
    smsId: {

    type: String,

    default: null

},



    fiveSimId: {

        type:String,

        default:null

    },



    createdAt: {

        type:Date,

        default:Date.now

    }



});



module.exports =
mongoose.model(
"Order",
OrderSchema
);