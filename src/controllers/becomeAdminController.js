import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";

async function getBecomeAdmin(req, res) {
    if (!req.user) {
        res.status(401).redirect("/sign-in");
    } else {
        if (req.user.isadmin) {
            res.redirect("/admin");
        } else {
            res.render("become-admin.ejs", 
                { 
                    links: links, 
                    title: titles.becomeAdmin,
                    user: req.user,
                });
        }
    }
}
async function postBecomeAdmin(req, res) {
    if (!req.user) {
        res.status(401).redirect("/sign-in");
    } 
    if (req.body.isadmin == "on") {
        db.makeUserAdmin(req.user.id);
    } 
    res.redirect("/admin");
}

export { getBecomeAdmin, postBecomeAdmin };