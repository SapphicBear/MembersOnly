import { Router } from "express";
import * as controller from "./../controllers/becomeAdminController.js";

const router = Router();

router.get("/", controller.getBecomeAdmin);
router.post("/", controller.postBecomeAdmin)
export { router as becomeAdminRouter };