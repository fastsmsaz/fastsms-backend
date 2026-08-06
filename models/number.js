const mongoose = require("mongoose");


const NumberSchema = new mongoose.Schema({

    phone:{
        type:String,
        required:true
    },

    country:{
        type:String,
        required:true
    },

    service:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        default:"Available"
    },

    owner:{
        type:String,
        default:null
    },

    smsCode:{
        type:String,
        default:null
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model(
"Number",
NumberSchema
);