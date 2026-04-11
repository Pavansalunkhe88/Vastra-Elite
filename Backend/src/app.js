import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import passport from "passport";
import {Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(cors({ origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"], 
//     credentials: true 
// }));


import { googleCallback } from "./controllers/auth.controller.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback', // Match Google Cloud exactly
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Explicit route to match exactly what Google calls based on GCP config!
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }), googleCallback);

app.use("/api/auth", authRouter);

export default app;