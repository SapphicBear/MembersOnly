import { Router } from "express";
import * as signUp from "./../controllers/signUpController.js";

const router = Router();

router.get("/", signUp.getSignUp);
router.post("/", signUp.postSignUp);

export { router as signUpRouter };