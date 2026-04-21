import { Router } from "express";
import { validateRegisterUser, validateLogin } from "../validator/auth.validator.js";
import { register , login, getMe } from "../controllers/auth.controller.js";
import passport from "passport";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser, register);

authRouter.post("/login", validateLogin, login);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get("/me",authenticateUser,getMe)

export default authRouter;