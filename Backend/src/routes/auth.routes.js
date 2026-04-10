import { Router } from "express";
import { validateRegisterUser, validateLogin } from "../validator/auth.validator.js";
import { register , login} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register",validateRegisterUser, register);

authRouter.post("/login", validateLogin, login);

export default authRouter;