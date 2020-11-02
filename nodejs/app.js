const fs = require("fs");
let fileText;
fs.readFile(
    "../database/lines.txt",
    "utf8",
    (err, data) => (fileText = data.split("\n"))
);

const hash = require("crypto");
const express = require("express");
const { request } = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/nodejs/sha", (req, res) => {
    let first = req.body.First;
    let second = req.body.Second;

    // if (!(isPositiveInteger(first) && isPositiveInteger(second)))
    //     return res.send({ Answer: "Number was expected for both inputs!" });

    const response = {
        Operation: "SHA256",
        Answer: first + second,
        Error: undefined,
    };

    res.send({
        Operation: "SHA256",
        Answer: hash
            .createHash("sha256")
            .update(String(response.Answer))
            .digest("hex"),
        Error: undefined,
    });
});

app.get("/nodejs/write", (req, res) => {
    let { Line: lineNumber } = req.query;
    console.log(req.query);
    if (lineNumber > 100 || lineNumber < 0)
        return res.send("Error: Invalid index");
    if (lineNumber > 100 || lineNumber < 0)
        return res.send("Error: out of bound");
    const response = {
        result: String(fileText[lineNumber - 1]).replace("\r", ""),
    };
    res.send(response.result);
});

const port = 3000;
app.listen(port, () => console.log(`listenin on port ${port}...`));

function isPositiveInteger(x) {
    return Number.isInteger(x) && x > 0;
}
