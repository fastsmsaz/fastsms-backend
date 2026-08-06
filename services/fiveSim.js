// =========================================
// FASTSMS 5SIM SERVICE
// FULL SYSTEM
// BUY + SMS + CANCEL
// =========================================


const axios = require("axios");


const FIVE_SIM_KEY = process.env.FIVESIM_KEY;

console.log("5SIM KEY:", FIVE_SIM_KEY ? "VAR" : "YOXDUR");

const headers = {

    "Authorization":
    "Bearer " + FIVE_SIM_KEY,

    "Accept":
    "application/json"

};




// ===============================
// BUY NUMBER
// ===============================

async function buyNumber(country, service){


    try{


        const response =
        await axios.get(

        `https://5sim.net/v1/user/buy/activation/${country}/any/${service}`,

        {
            headers
        }

        );



        return response.data;



    }catch(error){


        console.log(
            "5SIM BUY ERROR:",
            error.response?.data || error.message
        );


        return null;


    }


}




// ===============================
// GET SMS
// ===============================

async function getSMS(id){


    try{


        const response =
        await axios.get(

        `https://5sim.net/v1/user/check/${id}`,

        {
            headers
        }

        );


        return response.data;



    }catch(error){


        console.log(
            "5SIM SMS ERROR:",
            error.response?.data || error.message
        );


        return null;


    }


}




// ===============================
// CANCEL NUMBER
// ===============================

async function cancelNumber(id){


    try{


        const response =
        await axios.get(

        `https://5sim.net/v1/user/cancel/${id}`,

        {
            headers
        }

        );


        return response.data;



    }catch(error){

    console.log(
        "5SIM STATUS:",
        error.response?.status
    );


    console.log(
        "5SIM ERROR DATA:",
        error.response?.data
    );


    console.log(
        "5SIM ERROR MESSAGE:",
        error.message
    );


    return null;

}


}





// VACİB
module.exports = {

    buyNumber,

    getSMS,

    cancelNumber

};