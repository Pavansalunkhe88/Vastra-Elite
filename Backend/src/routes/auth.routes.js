import { Router } from "express";
import { validateRegisterUser, validateLogin } from "../validator/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser, register);

authRouter.post("/login", (req, res) => {
    // Login logic here
    res.status(200).json({ message: "User logged in successfully" });
});

export default authRouter;