import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { matchedData, validationResult } from "express-validator";

async function getNewMessage(req, res) {
    res.render("new-message", 
        { 
            title: titles.newMessage, 
            links: links, 
            header: "New Message!" 
        });
}

export { getNewMessage };