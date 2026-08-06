const mongoose = require("mongoose");


const SMSSchema = new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },


    phone:{
        type:String,
        required:true
    },


    message:{
        type:String,
        required:true
    },


    status:{
        type:String,
        default:"Sent"
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "SMS",
    SMSSchema
);