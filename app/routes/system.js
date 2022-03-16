const express = require('express');
const router = express.Router();
const os = require("os");

/**
 * @swagger
 * /system:
 *   get:
 *     summary: Retrieve the hostname
 *     responses:
 *      '200':
 *          description: Successfully returned the hostname
*/
router.get('/', (req, res) => {
    res.send(`Hello ${os.hostname()}`);
});

/**
 * @swagger
 * /system/username-secret:
 *   get:
 *     summary: Retrieve the username saved in secrets
 *     responses:
 *      '200':
 *          description: Successfully returned the secret username
*/
router.get('/username-secret', (req, res) => {
    res.send(process.env.SECRET_USERNAME);
});

module.exports = router;