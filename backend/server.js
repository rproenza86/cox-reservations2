'use strict';

var express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());

const hostname = '127.0.0.1';
const port = 3003;

function createReservation(){
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/calendarReservations", function(err, db) {
        if(!err) {

            var collection = db.collection('coxauto');
            //first value inserted for testing
            var res1 = {status:'reserved',editing:false, clientName:'Raul',clientLastName:'Proenza',clienEmail:'rproenza86@gmail.com',clientPhone:'123-456-7890', day:'03/07/2017',hour:'9:00AM'}

            collection.insert(res1, {w:1}, function(err, result) {
                if(err) {
                    console.log('ups! was found an error in the operation!')
                    return console.dir(err, result);
                }else
                    return console.log("Insertion successfull");
            });
        }else
            return console.dir(err);
    });
}

function updateReservation(){
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
        if(!err) {
            /**
             * update examples
             * $inc - increment a particular value by a certain amount
                $set - set a particular value
                $unset - delete a particular field (v1.3+)
                $push - append a value to an array
                $pushAll - append several values to an array
                $addToSet - adds value to the array only if its not in the array already
                $pop - removes the last element in an array
                $pull - remove a value(s) from an existing array
                $pullAll - remove several value(s) from an existing array
                $rename - renames the field
                $bit - bitwise operations
             */
            var collection = db.collection('test');
            
            collection.update({'hello':'doc1'}, {$set:{hello:'doc0001'}}, {w:1}, function(err, result) {
                if(err)
                    console.dir(err)
                else
                    console.dir(result)
            });
            
            return console.log("We are connected");
        }else
            return console.dir(err);
    });
}

function delReservation(){
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
        if(err) { return console.dir('error conection to colection exampleDb',err); }

        var collection = db.collection('test');

        collection.remove({'hello':'doc001'}, {w:1}, function(err, result) {
            if(err) { return console.dir('error deleting the doc',err); }
        });

        //collection.remove(); //will remove all documents in the collection.
    });
}

function getReservations(){
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
        if(err) { return console.dir(err); }

        var collection = db.collection('test');

        collection.find().toArray(function(err, items) {
            if(err) { return console.dir(err); }
            return items
        });
    });
}


app.get('/', function (req, res) {
      // Retrieve
        var MongoClient = require('mongodb').MongoClient;

        // Connect to the db
        MongoClient.connect("mongodb://localhost:27017/calendarReservations", function(err, db) {
            if(err) { return console.dir(err); }

            var collection = db.collection('coxauto');

            collection.find().toArray(function(err, items) {
                if(err) { return console.dir(err); }
                
                var responseBody = {apiData: items};
                
                res.send(JSON.stringify(responseBody));
                //res.write(JSON.stringify( getReservations() ));
                console.log('server hitted correctly!',responseBody);
            });
        });
})

app.put('/reservation', function (req, res) {
    var responseBody = {apiData: "response test"};
                
    res.send(JSON.stringify(responseBody));
    //res.write(JSON.stringify( getReservations() ));
    console.log('server hitted correctly!',req.params,req.query);
})

app.delete('/reservation', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(3010, function () {
  console.log('Example app listening on port 3010!')
})