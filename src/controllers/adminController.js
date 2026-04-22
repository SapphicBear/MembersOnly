import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";

async function getAdmin(req, res) {
    if (!req.user) {
        res.status(401).redirect("/sign-in");
    } else if (!req.user.isadmin) {
        res.status(401).redirect("/");
    } else {
        const users = await db.getUsers();
        const messages = await Promise.all(users.map(async (user) => {
            let messages = await db.getUserMessages(user.id);
            return { id: user.id, messages };
        }));
        res.render("admin.ejs", 
            { 
                links: links, 
                title: titles.admin,
                user: req.user,
                messages: messages,
                users: users
            });
    }
}
async function postAdmin(req, res) {
    if (!req.user) {
        res.status(401).redirect("/");
    } else if (!req.user.isadmin) {
        res.status(401).redirect("/");
    } else {
        await db.deleteMessage(req.body.id);
        res.redirect("/admin")
    }
}

export { getAdmin, postAdmin };