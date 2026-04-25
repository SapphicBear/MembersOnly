import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";

async function getMember(req, res) {
    if (!req.user) {
        res.redirect("/");
    } else if (req.user.ismember) {
        res.redirect("/");
    } else {
        res.render("member", 
            { 
                title: titles.member, 
                links: links 
            });
    }
}

async function postMember(req, res) {
    if (!req.user) {
        res.redirect("/sign-in");
    } else {
        await db.makeUserMember(req.user.id);
        res.redirect("/");
    }
}

export { getMember, postMember };