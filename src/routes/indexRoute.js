import { Router } from "express";
import * as index from "../controllers/indexController.js";

const router = Router();

router.get("/", index.indexGet);

export { router as indexRouter };