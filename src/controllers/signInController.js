import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { signIn } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";
import { passport } from "./../passport/passport.js";

async function getSignIn(req, res) {
    if (req.user) {
        res.redirect("/");
    } else {
        if (Array.isArray(req.session.messages) || req.session.messages.length > 0) {
            req.session.messages.forEach((msg) => req.session.error.push({ msg: msg }));
        }
        res.render("sign-in", 
        {
            title: titles.signIn,
            links: links,
            errors: req.errors || req.session.error,
        });
        req.session.error = [];
        req.session.messages = [];
    }
}

const attemptSignIn = [
    signIn,

    (req, res, next) => {
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
    },
];
export { getSignIn, attemptSignIn };