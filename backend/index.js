const express = require('express');
const app = express();
const port = 3000;
let url = require('url');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//added by paul
const path = require('path');
app.use(express.static(__dirname+"/public"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/image_gallery.html'));
})
/////////////////
//---------------connecting to MongoDB------------//
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:root@cluster0.usof1.mongodb.net/landscapeAUB?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {

        let countriesCollection = client.db("landscapeAUB").collection("countries");
        let plantsCollection = client.db("landscapeAUB").collection("plants");
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
        //added by paul
        app.get("/plants", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in plants");
            plantsCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })
        
        //route for plant filter by criteria
        app.post("/searchByCriteria", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in searchByCriteria");
            let filters = req.body;
            console.log(filters);
            //TODO: use the filters to select plants that meet ALL the criteria
            
        })

        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
