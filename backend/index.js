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
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/pants_page', (req, res) => {
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
        let allPlantsColletion = client.db("landscapeAUB").collection("plants-AK");
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
            console.log(req.query.type);
            if (req.query.type=="all"){
                plantsCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
            }
            else {
                plantsCollection.find({type: req.query.type}).toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
                
            }

        })
        
        //route for plant filter by criteria
        app.post("/searchByCriteria", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in searchByCriteria");
            let filters = req.body;
            console.log(filters);

            let query = { $and: [] };

            if(filters.country != ""){
                query.$and.push({country: filters.country});
            }
            if(filters.plantType.length!=0){
                query.$and.push({plantType:{$in: filters.plantType}});
            }
            if(filters.temperatures.length!=0){
                query.$and.push( {temperatures:{$in: filters.temperatures}});
            }
            if(filters.light.length!=0){
                query.$and.push( {light:{$in: filters.light}});
            }
            if(filters.soil.length!=0){
                query.$and.push( {soil:{$in: filters.soil}});
            }
            if(filters.water.length!=0){
                query.$and.push( {water:{$in: filters.water}});
            }
            if(filters.lifeCycle.length!=0){
                query.$and.push( {lifeCycle:{$in: filters.lifeCycle}});
            }
            if(filters.outdoor.length!=0){
                query.$and.push( {outdoor:{$in: filters.outdoor}});
            }
            if(filters.canopyShape.length!=0){
                query.$and.push( {canopyShape:{$in: filters.canopyShape}});
            }
            if(filters.plantHeight.length!=0){
                query.$and.push( {plantHeight:{$in: filters.plantHeight}});
            }
            if(filters.plantSpread.length!=0){
                query.$and.push( {plantSpread:{$in: filters.plantSpread}});
            }
            if(filters.plantColorGrow.length!=0){
                query.$and.push( {plantColorGrow:{$in: filters.plantColorGrow}});
            }
            if(filters.colorFlower.length!=0){
                query.$and.push( {colorFlower:{$in: filters.colorFlower}});
            }
            if(filters.flowerScent.length!=0){
                query.$and.push( {flowerScent:{$in: filters.flowerScent}});
            }
            if(filters.fruitColor.length!=0){
                query.$and.push( {fruitColor:{$in: filters.fruitColor}});
            }
            if(filters.trunkCrownshaft.length!=0){
                query.$and.push( {trunkCrownshaft:{$in: filters.trunkCrownshaft}});
            }
            if(filters.invasivePotential.length!=0){
                query.$and.push( {invasivePotential:{$in: filters.invasivePotential}});
            }
            
            console.log(query);
            //TODO: this now works, just need to send the info to a view engine or frontend for rendering
            //finding all that match
            allPlantsColletion.find(query).toArray()
                .then(results => console.log(results));
            
        })

        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
