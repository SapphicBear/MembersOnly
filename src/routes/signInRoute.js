import { Router } from "express";
import * as signIn from "../controllers/signInController.js";

const router = Router();

router.get("/", signIn.getSignIn);

export { router as signInRouter };