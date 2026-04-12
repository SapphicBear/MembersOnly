import { Router } from "express";
import { getNewMessage } from "../controllers/newMessageController.js";
const router = Router();

router.get("/", getNewMessage);

export { router as newMessageRouter };