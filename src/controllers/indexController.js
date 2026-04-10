import { links } from "../data/links.js";

async function indexGet(req, res) {
    const header = "Secret Message";
    const title = "Members Only!";
    res.render("index", 
        {
            title: title,
            header: header,
            links: links,
        });
}
export { indexGet };