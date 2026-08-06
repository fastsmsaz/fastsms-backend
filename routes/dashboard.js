
// =========================================
// FASTSMS DASHBOARD ROUTE
// =========================================


const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");

const User = require("../models/User");

const Order = require("../models/order");




// USER DASHBOARD DATA


router.get("/", auth, async (req,res)=>{


try{


const userId = req.user.id;





const user = await User.findById(userId)
.select("-password");



if(!user){


return res.status(404).json({

message:"İstifadəçi tapılmadı"

});


}





const orders =
await Order.find({

user:userId

});







const activeOrders =
orders.filter(
(order)=>
order.status==="waiting"
);







const completedOrders =
orders.filter(
(order)=>
order.status==="completed"
);







res.json({


user,


dashboard:{


balance:user.balance || 0,


activeOrders:
activeOrders.length,


smsCount:
completedOrders.length



}



});







}catch(error){



res.status(500).json({

message:error.message

});



}



});







module.exports = router;