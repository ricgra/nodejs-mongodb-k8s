const { MongoClient } = require('mongodb');


module.exports = (url, callback) => {
    const db = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    db.connect(err => {
        callback(err, db);
    });
};