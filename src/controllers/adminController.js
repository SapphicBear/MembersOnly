import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";

async function getAdmin(req, res) {
    if (!req.user) {
        res.status(401).redirect("/sign-in");
    } else if (!req.user.isadmin) {
        res.status(401).redirect("/");
    } else {
        res.render("admin.ejs", 
            { 
                links: links, 
                title: titles.admin 
            });
    }
}

export { getAdmin };