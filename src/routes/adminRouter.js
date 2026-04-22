import { Router } from "express";
import * as controller from "./../controllers/adminController.js";

const router = Router();

router.get("/", controller.getAdmin);
router.post("/", controller.postAdmin);

export { router as adminRouter };