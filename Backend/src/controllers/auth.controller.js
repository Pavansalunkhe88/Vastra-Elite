import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user,res,message){
      const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

    
}

export const register = async (req,res)=>{
    const {email,contact,password,fullname,isSeller}=req.body;

    try{
        // Check if user already exists
        const existingUser = await userModel.findOne({ 
            $or: [{ email }, { contact }]
         });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = await userModel.create({ 
            email, 
            contact, 
            password, 
            fullname,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, res, "User registered successfully");
        
    }catch (error) {
        console.error("Error checking existing user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req,res)=>{
    const {email,password}=req.body;

    
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }   
        // Check if password matches    
        const isMatch = await user.comparePassword(password);

        // If password does not match, return error
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If login is successful, send token response
        await sendTokenResponse(user, res, "User logged in successfully");

}        