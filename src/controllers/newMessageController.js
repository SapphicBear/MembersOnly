import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { matchedData, validationResult } from "express-validator";
import { newMessage } from "./input_validation/inputValidation.js";
import * as db from "./../../db/queries.js";

async function getNewMessage(req, res) {
    if (!req.user) {
        const error = { msg: "Not authorized. Please Sign in or make an account." }
        req.session.error = [error];
        res.status(401).redirect("/sign-in");
    } else {
        res.status(400).render("new-message", 
        { 
            title: titles.newMessage, 
            links: links, 
            header: "New Message!",
            user: req.user,
            message: "",
        });
    }
}
const postNewMessage = [
    newMessage,

    async (req, res) => {
        if (!req.user) {
            const error = { msg: "Not authorized. Please Sign in or make an account." }
            req.session.error = [error];
            res.status(401).redirect("/sign-in");
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = {
                title: req.body.title,
                body: req.body.body,
            };
            res.status(400).render("new-message", {
                errors: errors.array(),
                links: links,
                title: titles.newMessage,
                header: "New Message!",
                message: message,
            });
        } else {
            const data = matchedData(req);
            console.log(data);
            await db.newMessage(req.user.id, data.title, data.body);
            res.redirect("/");
        }
    }
]


export { getNewMessage, postNewMessage };