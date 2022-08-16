const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    MongoClient
        .connect('mongodb+srv://sebastian:Lucecita0510@cluster0.eyvlq.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected');
            _db = client.db();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
