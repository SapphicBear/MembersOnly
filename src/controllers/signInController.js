import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { signIn } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";

async function getSignIn(req, res) {
    const title = "Sign in to your account";
    res.render("sign-in", 
        {
            title: titles.signIn,
            links: links,
        });
}

const attemptSignIn = [
    signIn,

    async (req, res, next) => {
        const title = "Sign in to your account";
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("sign-in", {
                errors: errors.array(),
                links: links,
                title: title,
            });
        } else {
            const data = matchedData(req);
            res.redirect("/");
        }
    },
];
export { getSignIn, attemptSignIn };