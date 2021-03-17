var AWS = require("aws-sdk");
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000 ;
var MongoClient = require('mongodb').MongoClient;

// mongoose.connect("mongodb+srv://All_users_25:test@cluster0.mjn0g.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
//   .then(() => console.log("connection success...."))
//   .catch((err) => console.log(err));

var url = "mongodb+srv://All_users_25:test@cluster0.mjn0g.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAY47SQ2DUOHJKTXP6", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
var result;

var dynamoDB = new AWS.DynamoDB.DocumentClient();

async function fetchDatafromDatabase1() { // Scan method fetch data from dynamodb

    var params = {
        TableName:"esp32_data"
    };

    let queryExecute = new Promise((res, rej) => {
        dynamoDB.scan(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            rej(err);
        } else {
            console.log("Success! Scan method fetch data from dynamodb");
            res(JSON.stringify(data, null, 2));
        }
        }); 
    });
    const result = await queryExecute;
    console.log(result);
    const objdata = JSON.parse(result);
    console.log(objdata)
    console.log(objdata.Items)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("mydatas").insertMany(objdata.Items, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}

fetchDatafromDatabase1();

// const testingSchema = new mongoose.Schema({
//     chip_id: String,
//     humidity: String,
//     temperature: Number,
//     ts: Number,
//     versionkey: false
//   })

// function myFunc() {
//     console.log("print result");
//     console.log(result);
//   }
  
//   setTimeout(myFunc, 3000, 'funky');

//const Mydata = new mongoose.model('Dynamo', testingSchema);

// const dynamodata = new result({
// })

// result.save();
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     dbo.collection("mydatas").insertMany(result, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

app.listen(port, () => {
    console.log(`listening to ${port}`);
  })