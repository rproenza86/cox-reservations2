'use strict';

var express = require('express')
  , bodyParser = require("body-parser")
  , cors = require('cors')
  , app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3003;

function createReservation(reservation,res){
    let procResult = {}
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://127.0.0.1:27017/calendarReservations", function(err, db) {
        if(!err) {

            var collection = db.collection('coxauto');
            collection.insert(reservation, {w:1}, function(err, result) {
                
                if(err) {
                    procResult = {
                        msg: 'ups! was found an error in the operation!',
                        error: err
                    }
                    console.dir(error);
                }else
                     procResult = {msg:"Insertion successfull"};
            });
        }else
            procResult = {
                            msg: 'ups! was found an error in the operation!',
                            error: err
                         }

        res.send(JSON.stringify(procResult));
    });
}

function updateReservations(){
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

function getReservations(res){
    let procResult = {};
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/calendarReservations", function(err, db) {
        if(err) {
            procResult = {
                msg: 'ups! was found an error in the operation!',
                error: err
            }
            console.dir(error);
        }else{

        }
                    

        var collection = db.collection('coxauto');

        collection.find().toArray(function(err, items) {
            procResult = {
                msg: 'ups! was found an error in the query operation!',
                error: err
            }
            console.dir(error);
            
            procResult = {apiData: items};
            
            console.log('server hitted correctly!',responseBody);
            res.send(JSON.stringify(responseBody));
        });
    });
}


app.get('/', function (req, res) {
      getReservations(res);
})

app.post('/reservation', function (req, res) {
    let responseBody = {apiData: "Process result"};

    if(req.body){
        const reservation = { 
                                status: req.body.status,
                                editing:req.body.editing, 
                                clientName:req.body.clientName,
                                clientLastName:req.body.clientLastName,
                                clienEmail:req.body.clienEmail,
                                clientPhone:req.body.clientPhone, 
                                day:req.body.day,
                                hour:req.body.hour
                            };
        createReservation(reservation, res);
    }
})

app.put('/reservation', function (req, res) {
    var responseBody = {apiData: "response test"};
    var user_id = req.query.id;
    var token = req.query.token;
    var geo = req.query.geo;  

    if(req.body){
        var user_name=req.body._id;
        var password=req.body.hello;
    }

    //res.send(user_id + ' ' + token + ' ' + geo + ' ' + user_name + ' ' + password);
    res.send(JSON.stringify({apiData:'good!'}));
    //res.write(JSON.stringify( getReservations() ));
    console.log('server hitted correctly!',req.param.a,req.query, req.body);
})

app.delete('/reservation', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(3010, function () {
  console.log('Example app listening on port 3010!')
})
