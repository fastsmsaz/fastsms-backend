// =========================================
// FASTSMS USER MODEL
// =========================================

const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    // İstifadəçi adı
    name: {
        type: String,
        required: true,
        trim: true
    },


    // Email
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },


    // Şifrə (hash olunmuş)
    password: {
        type: String,
        required: true
    },


    // Balans
    balance: {
        type: Number,
        default: 0
    },


    // Hesab rolu
    role: {
        type: String,
        default: "user",
        enum: [
            "user",
            "admin"
        ]
    },


    // Alınan nömrələr tarixçəsi
    orders: [
        {
            phoneNumber: {
                type: String
            },

            country: {
                type: String
            },

            service: {
                type: String
            },

            price: {
                type: Number
            },

            status: {
                type: String,
                default: "waiting"
            },

            smsCode: {
                type: String,
                default: null
            },


            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],


    // Hesab yaradılma vaxtı
    createdAt: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model(
    "User",
    UserSchema
);
