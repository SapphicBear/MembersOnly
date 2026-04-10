import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import "@dotenvx/dotenvx/config";
import { indexRouter } from "./routes/indexRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);


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