// =========================================
// FASTSMS ORDER ROUTES
// 5SIM CONNECTED VERSION
// =========================================


const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");

const User = require("../models/User");

const Order = require("../models/Order");


const {
    buyNumber,
    getSMS,
    cancelNumber

} = require("../services/fiveSim");




// =========================================
// BUY NUMBER
// =========================================


router.post(
"/buy",
auth,
async(req,res)=>{


try{


const user =
await User.findById(
req.user.id
);




if(!user){


return res.status(404).json({

message:
"İstifadəçi tapılmadı"

});


}





const {
country,
service
}
=
req.body;





if(!country || !service){


return res.status(400).json({

message:
"Ölkə və servis seçin"

});


}






const price =
1.50;






if(user.balance < price){


return res.status(400).json({

message:
"Balans kifayət etmir"

});


}






// 5SIM-DƏN NÖMRƏ AL


const number =
await buyNumber(
country,
service
);






if(!number){


return res.status(400).json({

message:
"Nömrə tapılmadı"

});


}









// BALANS ÇIX


user.balance -= price;


await user.save();








// ORDER YARAT


const order =
new Order({

user:user._id,


phoneNumber:
number.phone,


country,


service,


price,


fiveSimId:
number.id,


status:
"active"



});






await order.save();






res.json({


success:true,


message:
"Nömrə alındı",


balance:
user.balance,


order



});







}catch(error){


console.log(error);


res.status(500).json({

message:
"Server xətası"

});


}



});









// =========================================
// USER ORDERS
// =========================================


router.get(
"/",
auth,
async(req,res)=>{


try{


const orders =
await Order.find({

user:req.user.id

})
.sort({

createdAt:-1

});





res.json(
orders
);




}catch(error){


res.status(500).json({

message:
"Sifariş xətası"

});


}



});









// =========================================
// ACTIVE SMS
// =========================================


router.get(
"/active",
auth,
async(req,res)=>{


try{


const orders =
await Order.find({

user:req.user.id,


status:
"active"


});





res.json(
orders
);





}catch(error){


res.status(500).json({

message:
"Aktiv SMS xətası"

});


}



});









// =========================================
// CHECK SMS CODE
// =========================================


router.get(
"/sms/:id",
auth,
async(req,res)=>{


try{


const order =
await Order.findOne({

_id:req.params.id,

user:req.user.id

});





if(!order){


return res.status(404).json({

message:
"Sifariş tapılmadı"

});


}






const sms =
await getSMS(
order.fiveSimId
);






if(
sms &&
sms.sms &&
sms.sms.length > 0
){


order.smsCode =
sms.sms[0].code;


order.status =
"completed";


await order.save();


}







res.json({

status:
order.status,


code:
order.smsCode


});






}catch(error){


res.status(500).json({

message:
"SMS yoxlama xətası"

});


}



});









// =========================================
// CANCEL ORDER
// =========================================


router.post(
"/cancel/:id",
auth,
async(req,res)=>{


try{


const order =
await Order.findOne({

_id:req.params.id,

user:req.user.id

});





if(!order){


return res.status(404).json({

message:
"Sifariş tapılmadı"

});


}






await cancelNumber(
order.fiveSimId
);






order.status =
"cancelled";


await order.save();






res.json({

message:
"Sifariş ləğv edildi"

});






}catch(error){


res.status(500).json({

message:
"Ləğv xətası"

});


}



});








module.exports =
router;