import { links } from "../data/links.js";
import { titles } from "../data/titles.js";
import { signUp } from "./input_validation/inputValidation.js";
import { matchedData, validationResult } from "express-validator";

async function getSignUp(req, res) {
    res.render("sign-up", 
        { 
            title: titles.signUp, 
            links: links ,
        });
}

export { getSignUp };