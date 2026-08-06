// =========================================
// FASTSMS USER ROUTES
// =========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/User");




// USER PROFILE

router.get("/profile", auth, async (req, res) => {

    res.json({

        name: req.user.name,

        email: req.user.email,

        balance: req.user.balance,

        role: req.user.role

    });

});






// =========================================
// ADD BALANCE
// =========================================


router.post("/deposit", auth, async (req, res) => {


    try {


        const { amount } = req.body;



        if(!amount || amount <= 0){


            return res.status(400).json({

                message:"Məbləğ düzgün deyil"

            });


        }





        const user = await User.findById(req.user.id);





        if(!user){


            return res.status(404).json({

                message:"İstifadəçi tapılmadı"

            });


        }





        user.balance += Number(amount);



        await user.save();






        res.json({


            success:true,


            message:"Balans artırıldı",


            balance:user.balance



        });




    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server xətası"

        });


    }



});






module.exports = router;