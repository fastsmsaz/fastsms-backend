// =========================================
// FASTSMS AUTH CONTROLLER
// =========================================

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ===============================
// REGISTER
// ===============================

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        const exist = await User.findOne({
            email
        });


        if (exist) {

            return res.status(400).json({
                message: "Bu email artıq istifadə olunur"
            });

        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            balance: 0,

            role: "user"

        });


        res.json({

            message: "Qeydiyyat uğurludur",

            user: {

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// ===============================
// LOGIN
// ===============================

exports.login = async (req, res) => {

    try {


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({
            email
        });



        if (!user) {

            return res.status(404).json({

                message: "İstifadəçi tapılmadı"

            });

        }



        const check = await bcrypt.compare(
            password,
            user.password
        );



        if (!check) {

            return res.status(400).json({

                message: "Şifrə yanlışdır"

            });

        }



        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );



        res.json({

            message: "Login uğurlu",

            token,


            user: {

                name: user.name,

                email: user.email,

                balance: user.balance,

                role: user.role

            }

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};