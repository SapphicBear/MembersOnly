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
                    errors: ""
                });
        }
    }
}
async function postBecomeAdmin(req, res) {
    const password = 123;
    if (!req.user) {
        res.status(401).redirect("/sign-in");
    } 
    if (req.body.isadmin == "on" && Number.parseInt(req.body.secret_password) == password) {
        db.makeUserAdmin(req.user.id);
        res.redirect("/admin");
    } else {
        res.status(401).render("become-admin", 
            {
                links: links,
                title: titles.becomeAdmin,
                user: req.user,
                errors: { msg: "Password incorrect."},
            });
    }
    
}

export { getBecomeAdmin, postBecomeAdmin };