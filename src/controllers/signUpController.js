import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { signUp } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as db from "./../../db/queries.js";

async function getSignUp(req, res) {
    if (req.user) {
        res.redirect("/");
    } else {
        res.render("sign-up", 
        { 
            title: titles.signUp, 
            links: links ,
            input: "",
            errors: req.errors,
        });
    }
}
const postSignUp = [
    signUp,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const input = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                username: req.body.username
            };
            res.render("sign-up", 
                {
                    errors: errors.array(),
                    links: links,
                    title: titles.signUp,
                    input: input
                });
        } else {
            const data = matchedData(req);
            try { 
                const name = `${data.first_name} ${data.last_name}`;
                const hashedPassword = await bcrypt.hash(data.password, 10);
                await db.newUser(name, data.username, data.email, hashedPassword);
                res.redirect("/sign-in");
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    },

];


export { getSignUp, postSignUp };