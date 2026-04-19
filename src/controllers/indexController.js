import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import * as db from "../../db/queries.js";
import { formatDistanceToNow } from "date-fns";

async function indexGet(req, res) {
    const header = "Secret Message";
    const messages = await db.getMessages();
    messages.map((message) => {
        message.date = formatDistanceToNow(message.date, { includeSeconds: true });
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