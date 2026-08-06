// =========================================
// FASTSMS ADMIN MIDDLEWARE
// =========================================

const admin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Bu səhifəyə giriş icazəsi yoxdur"
        });

    }

    next();

};


module.exports = admin;