import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { matchedData, validationResult } from "express-validator";
import { newMessage } from "./input_validation/inputValidation.js";
import * as db from "./../../db/queries.js";

async function getNewMessage(req, res) {
    if (!req.user) {
        const error = { msg: "Not authorized. Please Sign in or make an account." }
        req.session.error = [error];
        res.redirect("/sign-in");
    } else {
        res.render("new-message", 
        { 
            title: titles.newMessage, 
            links: links, 
            header: "New Message!",
            user: req.user,
        });
    }
}
const postNewMessage = [
    newMessage,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("new-message", {
                errors: errors.array(),
                links: links,
                title: titles.newMessage,
                header: "New Message!"
            });
        } else {
            const data = matchedData(req);
            await db.newMessage(req.user.id, data.title, data.body);
            res.redirect("/");
        }
    }
]


export { getNewMessage, postNewMessage };