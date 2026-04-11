import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { signIn } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";
import { passport } from "./../passport/passport.js";

async function getSignIn(req, res) {
    res.render("sign-in", 
        {
            title: titles.signIn,
            links: links,
            errors: req.errors,
        });
}

const attemptSignIn = [
    signIn,

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("sign-in", {
                errors: errors.array(),
                links: links,
                title: titles.signIn,
            });
        } else {
            req.body = matchedData(req);
            passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/sign-in",
                failureMessage: true,
            })(req, res, next);
        }
    }
];
export { getSignIn, attemptSignIn };