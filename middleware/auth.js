// =========================================
// FASTSMS JWT AUTH MIDDLEWARE
// =========================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");


const auth = async (req, res, next) => {

    try {

        const token = req.header("Authorization");


        if (!token) {

            return res.status(401).json({
                message: "Token yoxdur"
            });

        }


        const actualToken = token.replace("Bearer ", "");


        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );


        const user = await User.findById(
            decoded.id
        );


        if (!user) {

            return res.status(404).json({
                message: "İstifadəçi tapılmadı"
            });

        }


        req.user = user;


        next();



    } catch(error) {


        res.status(401).json({

            message:"Token keçərsizdir"

        });


    }

};


module.exports = auth;