import { links } from "../data/links.js";

async function getSignIn(req, res) {
    const title = "Sign in to your account";
    res.render("sign-in", 
        {
            title: title,
            links: links,
        });
}
export { getSignIn };