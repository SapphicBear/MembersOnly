const express = require("express");
const path = require("node:path");

const PORT = 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


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