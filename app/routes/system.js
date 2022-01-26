const express = require('express');
const router = express.Router();
const os = require("os");

router.get('/', (req, res) => {
    res.send(`Hello ${os.hostname()}`);
});

router.get('/username-secret', (req, res) => {
    res.send(process.env.SECRET_USERNAME);
});

module.exports = router;