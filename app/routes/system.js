const express = require('express');
const router = express.Router();
const os = require("os");

router.get('/', (req, res) => {
    res.send(`Hello ${os.hostname()}`);
});

module.exports = router;