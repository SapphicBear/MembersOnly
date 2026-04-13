import { Router } from "express";
import { getNewMessage, postNewMessage } from "../controllers/newMessageController.js";
const router = Router();

router.get("/", getNewMessage);
router.post("/", postNewMessage);

export { router as newMessageRouter };