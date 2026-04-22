import { Router } from "express";
import * as controller from "./../controllers/becomeAdminController.js";

const router = Router();

router.get("/", controller.getBecomeAdmin);

export { router as becomeAdminRouter };