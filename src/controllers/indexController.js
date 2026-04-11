import { links } from "../data/links.js";
import { titles } from "../data/titles.js";

async function indexGet(req, res) {
    const header = "Secret Message";
    res.render("index", 
        {
            title: titles.index,
            header: header,
            links: links,
        });
}
export { indexGet };