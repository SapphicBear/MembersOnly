import { body } from "express-validator";

const errors = {
    usernameLen: "Username must be provided.",
    passwordLen: "Password must be provided."
}

const signInValidation = [
    body("username")
        .trim()
        .notEmpty()
        .escape()
        .withMessage(errors.usernameLen),
    body("password")
        .trim()
        .notEmpty()
        .escape()
        .withMessage(errors.passwordLen),
];

export { signInValidation };