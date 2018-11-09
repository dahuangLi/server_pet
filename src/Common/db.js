const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');


// Connection URL
const url = 'mongodb://39.104.160.118:27017';

// Database Name
const dbName = 'RN-USER';

// 连接MongoDB
var collection;

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db("RN-USER");
    collection = db.collection('userInfo');

});

let insertData =(data) => {
    return new Promise(function (resolve, reject) {
        collection.insertOne(data,function(err, res) {
            assert.equal(err, null);
            resolve(res);
        })
    });
};


let findData =(data) => {
    return new Promise(function (resolve, reject) {
        collection.find(data).toArray(function(err, docs) {
            assert.equal(err, null);
            resolve(docs);
        });
    });
};

let updateData =(oldData,addData) => {
    return new Promise(function (resolve, reject) {
        collection.updateOne(oldData,{ $set: addData }, function(err, result) {
            resolve(result);
        });
    });
};

module.exports = {
    insertData:insertData,
    findData:findData,
    updateData:updateData
};