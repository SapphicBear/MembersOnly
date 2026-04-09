const express = require("express");
const path = require("node:path");
const PORT = 3000;
const app = express();

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server live on ${PORT}`);
});