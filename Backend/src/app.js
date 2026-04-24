import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import session from "express-session";
import userModel from "./models/user.model.js";
import cartRouter from "./routes/cart.routes.js";
import cors from "cors";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.JWT_SECRET || 'vastra_elite_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
// app.use(cors({ origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"], 
//     credentials: true 
// }));


import { googleCallback } from "./controllers/auth.controller.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find user by googleId
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
            // Find user by email if googleId didn't match (maybe they registered normally first)
            user = await userModel.findOne({ email: profile.emails[0].value });

            if (user) {
                // Link account
                user.googleId = profile.id;
                await user.save();
            } else {
                // Create new user
                user = await userModel.create({
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    role: 'buyer' // Default role
                });
            }
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Explicit route to match exactly what Google calls based on GCP config!
// We'll keep this in main app.js because the callbackURL is root-relative
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }), googleCallback);

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

export default app;