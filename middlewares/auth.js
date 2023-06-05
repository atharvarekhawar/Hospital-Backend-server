const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isDoctor = (req, res, next) => {
    try {
        const token = req.cookies.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            res.status(401).json({
                success: false,
                message: "token not found , login again"
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            if (decode.role !== "doctor") {
                res.status(401).json({
                    success: false,
                    message: "Role is not doctor"
                })
            }
            req.user = decode;
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Could not verify the token"
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Error in verifying the doctor"
        })
    }


}