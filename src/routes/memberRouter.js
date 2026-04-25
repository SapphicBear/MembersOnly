import { Router } from "express";
import * as memberController from "./../controllers/memberController.js";
const router = Router();

router.get("/", memberController.getMember);
router.post("/", memberController.postMember);

export { router as memberRouter };