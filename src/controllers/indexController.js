import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";
import { formatDistanceToNow, format } from "date-fns";

async function indexGet(req, res) {
    const header = "Secret Message";
    const messages = await db.getMessages();
    messages.map((message) => {
        const now = new Date().toISOString().slice(0, 10).split("-");
        const date = message.date.slice(0, 10).split("-");
        
        if (date[1] !== now[1] || (now[2] - date[2]) > 5) {
            message.date = format(message.date, "PPP - HH:mm \(z\)");
        } else {
            message.date = formatDistanceToNow(message.date, { includeSeconds: true }) + " ago";
        }
    });
    res.render("index", 
        {
            title: titles.index,
            header: header,
            links: links,
            user: req.user,
            messages: messages,
        });
}
export { indexGet };