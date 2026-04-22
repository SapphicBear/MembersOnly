import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import "@dotenvx/dotenvx/config";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "./../db/pool.js";

import { indexRouter } from "./routes/indexRoute.js";
import { signInRouter } from "./routes/signInRoute.js";
import { signUpRouter } from "./routes/signUpRoute.js";
import { logOutRouter } from "./routes/logoutRoute.js";
import { newMessageRouter } from "./routes/newMessageRouter.js";
import { becomeAdminRouter } from "./routes/becomeAdminRoute.js";
import { adminRouter } from "./routes/adminRouter.js";
import { passport } from "./passport/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pgSession = new ConnectPgSimple(session);
const PORT = process.env.PORT || 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pool
    }),
    cookie: { maxAge: 60000 * 60 * 10 }
}));
app.use(passport.session());

app.use("/", indexRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-out", logOutRouter);
app.use("/new-message", newMessageRouter);
app.use("/become-admin", becomeAdminRouter);
app.use("/admin", adminRouter);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).send(error.message);
});

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server live on ${PORT}`);
});