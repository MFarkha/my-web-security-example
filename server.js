const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
    res.send("This is your secret value: 42");
})

const server = https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),
}, app);

server.listen(PORT, () => {
    console.log(`The app listening on port ${PORT}`);
})