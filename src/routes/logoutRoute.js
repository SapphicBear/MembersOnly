import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/sign-in");
    });
});


export {router as logOutRouter}