import { links } from "../data/links.js";
import { signUp } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";

async function getSignUp(req, res) {
    res.render("sign-up", { title: "Sign Up Page", links: links });
}

export { getSignUp };