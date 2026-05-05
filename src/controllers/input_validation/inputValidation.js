import { body } from "express-validator";

const errors = {
    length: {
        username: "Username must be provided.",
        password: "Password must be provided.",
        firstName: "Please enter your first name.",
        lastName: "Please enter your last name.",
        email: "Please enter your email.",
        message: "Please write your message!",
        title: "Please provide a title for your message!",
        bodyMax: "Message cannot be longer than 255 characters!",
    },
    type: {
        email: "Email must be a valid email address.",
    },
    match: {
        password: "Passwords must match each other.",
        email: "Please provide an email using '@example.com'",
    }
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
    body("first_name")
        .notEmpty()
        .withMessage(errors.length.firstName)
        ,
    body("last_name")
        .notEmpty()
        .withMessage(errors.length.lastName)
        ,
    body("username")
        .notEmpty()
        .withMessage(errors.length.username)
        ,
    body("email")
        .notEmpty()
        .withMessage(errors.length.email)
        .isEmail()
        .withMessage(errors.type.email)
        .custom(async (value, { req }) => {
            const re = /.+@example\.com$/;
            if (!re.test(value)) {
                throw new Error(errors.match.email)
            }
        })
        ,
    body("password")
        .notEmpty()
        .withMessage(errors.length.password),
    body("password_check")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(errors.match.password);
            };
        }),
    body("isadmin"),
    body("ismember")
];

const newMessage = [
    body("title")
    .notEmpty()
    .withMessage(errors.length.title)
    .trim()
    .escape()
    ,
    body("body")
    .notEmpty()
    .withMessage(errors.length.message)
    .isLength({ min: 1, max: 255 })
    .withMessage(errors.length.bodyMax)
    .trim()
    .escape()
    ,
];


export { signIn, signUp, errors, newMessage };