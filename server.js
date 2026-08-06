// =========================================
// FASTSMS ULTRA BACKEND
// SERVER
// =========================================


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./database");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/orders");



dotenv.config();



const app = express();



// ===============================
// DATABASE
// ===============================

connectDB();



// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());



// ===============================
// ROUTES
// ===============================


app.use("/api/auth", authRoutes);


app.use("/api/dashboard", dashboardRoutes);


app.use("/api/user", userRoutes);


app.use("/api/orders", orderRoutes);


app.use("/api/admin", adminRoutes);






// ===============================
// TEST ROUTE
// ===============================


app.get("/", (req, res) => {


    res.json({

        status: "success",

        message: "FastSMS Backend işləyir 🚀"

    });


});






// ===============================
// SERVER START
// ===============================


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {


    console.log(`
================================

FastSMS Backend Aktivdir 🚀

Port: ${PORT}

================================
`);


});

// =========================================
// LOAD REAL DASHBOARD DATA
// =========================================


