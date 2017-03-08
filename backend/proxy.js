const http = require('http');

const hostname = '127.0.0.1';
const port = 3003;

function createReservation(){
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
        if(!err) {
            /**
             * create examples
             */
            var collection = db.collection('test');
            var doc1 = {'hello':'doc1'};
            var doc2 = {'hello':'doc2'};
            var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

            collection.insert(doc1);

            collection.insert(doc2, {w:1}, function(err, result) {
                console.log('ups! was found an error in the operation!')
                console.dir(err, result);
            });

            collection.insert(lotsOfDocs, {w:1}, function(err, result) {
                console.log('ups! was found an error in the operation!')
                console.dir(err, result);
            });

            return console.log("We are connected");
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

const server = http.createServer((req, res) => {
    //addressing cors problems    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //res.setHeader('Access-Control-Allow-Headers', req.header.origin);

    if (req.method === 'GET' && req.url === '/reservation') {

        // Retrieve
        var MongoClient = require('mongodb').MongoClient;

        // Connect to the db
        MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
            if(err) { return console.dir(err); }

            var collection = db.collection('test');

            collection.find().toArray(function(err, items) {
                if(err) { return console.dir(err); }

                res.statusCode = 200;
                
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('X-Powered-By', 'Raul R. Proenza');
                res.setHeader('X-Powered-RRP', 'First Node APP!');
                
                var headers = req.headers;
                var method = req.method;
                var url = req.url;
                var body = items;

                var responseBody = {apiData: body};
                res.write(JSON.stringify(responseBody));
                //res.write(JSON.stringify( getReservations() ));
                res.end();
                console.log('server hitted correctly!');
            });
        });

    }else{
        res.statusCode = 404;
        res.end();
    }
    //testing next step
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
