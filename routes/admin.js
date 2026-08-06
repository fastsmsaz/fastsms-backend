// =========================================
// FASTSMS ADMIN ROUTES
// =========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../models/User");



// =========================================
// BÜTÜN İSTİFADƏÇİLƏR
// =========================================

router.get("/users", auth, admin, async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json({

            count: users.length,

            users

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});




// =========================================
// BALANS ARTIR
// =========================================

router.put("/balance/:id", auth, admin, async (req, res) => {

    try {

        const { amount } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                message: "İstifadəçi tapılmadı"

            });

        }

        user.balance += Number(amount);

        await user.save();

        res.json({

            message: "Balans uğurla artırıldı",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                balance: user.balance

            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



module.exports = router;