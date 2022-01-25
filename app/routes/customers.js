const express = require('express');
const router = express.Router();
const database = require('../db/database');

// MONGO
const mongoUrl = "mongodb://localhost:27017/";
const databaseName = "users";

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