const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "views", "home.html"));
})


app.listen(port, (req, res) => {
    console.log(`server running in http://localhost:${port}`);
    
}) 