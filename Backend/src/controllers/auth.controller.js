import userModel from "../models/user.model";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user,res){
    const token = {
        id: user._id
    };      
    return jwt.sign(token, 
        config.JWT_SECRET, 
        { expiresIn: "1h" }
    );
}

export const register = async (req,res)=>{
    const {email,contact,password,fullname}=req.body;

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
            fullname 
        });

        return res.status(201).json({ message: "User registered successfully", user });
        
    }catch (error) {
        console.error("Error checking existing user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}