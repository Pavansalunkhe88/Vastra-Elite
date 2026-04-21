import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user,res,message){
      const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

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

    try {
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

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}        

export const googleCallback = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.redirect("http://localhost:5173/login?error=auth_failed");
        }

        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Redirect to frontend homepage
        res.redirect("http://localhost:5173/");
        
    } catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect("http://localhost:5173/login?error=internal_server_error");
    }
}    

export const getMe = async(req,res)=>{
    try{
        const user = req.user;
        if(!user){
            return res.status(404).json({message:'User Not Found'});
        }

        res.status(200).json({
            message:'User retrieved successfully',
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
    catch(error){
        console.error("Get Current User Error:", error);
        res.status(500).json({message:'Internal Server Error'});
    }
}