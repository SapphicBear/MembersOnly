import { Router } from "express";
import * as signIn from "../controllers/signInController.js";
import { passport } from "./../passport/passport.js";
const router = Router();

router.get("/", signIn.getSignIn);
router.post("/", signIn.attemptSignIn);

export { router as signInRouter };