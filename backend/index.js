const express = require('express');
const app = express();
const port = 3000;
let url = require('url');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//---------------connecting to MongoDB------------//
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:root@cluster0.usof1.mongodb.net/landscapeAUB?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {

        let countriesCollection = client.db("landscapeAUB").collection("countries");
        console.log(countriesCollection);
        //---------------------routes------------------------//

        //route for countries
        app.get("/countries", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in countries");
            countriesCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })

        //

        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
