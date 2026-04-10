import { body } from "express-validator";

const errors = {
    length: {
        username: "Username must be provided.",
        password: "Password must be provided.",
    },
};

const signIn = [
    body("username")
        .trim()
        .notEmpty()
        .escape()
        .withMessage(errors.length.username),
    body("password")
        .trim()
        .notEmpty()
        .escape()
        .withMessage(errors.length.password),
];
const signUp = [

];

export { signIn, signUp };