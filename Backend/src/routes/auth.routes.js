import { Router } from "express";
import { validateRegisterUser, validateLogin } from "../validator/auth.validator.js";
import { register , login} from "../controllers/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser, register);

authRouter.post("/login", validateLogin, login);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default authRouter;