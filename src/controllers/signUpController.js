import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { matchedData, validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as db from "./../../db/queries.js";

async function getSignUp(req, res) {
    res.render("sign-up", 
        { 
            title: titles.signUp, 
            links: links ,
        });
}
async function postSignUp(req, res, next) {
    try { 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.newUser(req.body.name, req.body.username, req.body.email, hashedPassword);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export { getSignUp, postSignUp };