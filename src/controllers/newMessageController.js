import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { matchedData, validationResult } from "express-validator";

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

export { getNewMessage };