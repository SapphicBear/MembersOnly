import { Router } from "express";
import * as signUp from "./../controllers/signUpController.js";

const router = Router();

router.get("/", signUp.getSignUp);

export { router as signUpRouter };