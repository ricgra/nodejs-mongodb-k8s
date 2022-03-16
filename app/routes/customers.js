const express = require('express');
const router = express.Router();
const database = require('../db/database');

// MONGO
const mongoUrl = "mongodb://localhost:27017/";
const databaseName = "users";

/**
 * @swagger
 * /customer/{name}:
 *   get:
 *     summary: Retrieve a customer by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Customer name
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *          description: Successfully returned the customer
*/
router.get('/:name', (req, res) => {
    database(mongoUrl, function (err, db) {
        if (err) res.send(err);
        let dbo = db.db(databaseName);
        dbo.collection("customers").findOne({
            name: req.params.name
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
    });
});

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Create a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The customer's name.
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 description: The customer's age.
 *                 example: 25
 *     responses:
 *      '200':
 *          description: Successfully created the customer
*/
router.post('/', (req, res) => {
    database(mongoUrl, function (err, db) {
        if (err) res.send(err);
        let dbo = db.db(databaseName);
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
    });
});

module.exports = router;