import jwt from "jsonwebtoken";
import User from "../models/User.js";



// Middleware to protect routes
export const protectRoute = async(req , res , next) => {
    try {
        const token = req.headers.token;
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");
        if(!user) {
            return res.json({success:false , message: 'User not found'});
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e.message);
        res.json({success:false , message: e.message});
    }
}

// Controller to check if user is authenticated
export const checkAuth = (req,res) => {
    res.json({success: true , user:req.user});  
}