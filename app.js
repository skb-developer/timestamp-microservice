const express = require('express');
const app = express();
require('dotenv').config();

function isUnixTimestamp(dateString) {
    return /^\d+$/.test(dateString);
}

function unixToUtc(dateString) {
    var date = new Date((dateString / 1000) * 1000);
    return date.toUTCString();
}

function dateToUtc(dateString) {
    var date = new Date(dateString);
    var utc = date.toUTCString();
    return utc;
}

function dateToUnix(dateString) {
    var date = new Date(dateString);
    var unixTimestamp = date.getTime() / 1000;
    return unixTimestamp * 1000;
}

app.get('/', (req, res) => {
    res.send({ message: "Server Deployed" });
})

app.get('/api', (req, res) => {
    try {
        var date = new Date();
        var unix = dateToUnix(date);
        var utc = dateToUtc(date);
        res.send({ unix, utc });
    }
    catch (error) {
        res.send({ error: "Invalid Date" });
    }
})

app.get('/api/:date', (req, res) => {
    try {
        if (isUnixTimestamp(req.params.date)) {
            var utc = unixToUtc(req.params.date);
            res.send({ unix: parseInt(req.params.date), utc: utc })
        }
        else if (new Date(req.params.date).toString() !== 'Invalid Date') {
            var unix = dateToUnix(req.params.date);
            var utc = dateToUtc(req.params.date);
            res.send({ unix: unix, utc: utc });
        }
        else {
            res.send({ error: "Invalid Date" });
        }
    }
    catch (error) {
        res.send({ error: "Invalid Date" });
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server Running")
});

module.exports = app;