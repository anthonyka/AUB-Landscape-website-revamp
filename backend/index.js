const express = require('express');
const app = express();
const port = 3000;
let url = require('url');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


//added by paul
const path = require('path');
app.use(express.static(__dirname+"/public"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/pants_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/image_gallery.html'));
})
app.get('/searchByCriteria', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/search_by_criteria.html'));
})
app.get('/popular_pants_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/popular_plants.html'));
})
app.get('/popular_pants_page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/popular_plants2.html'));
})
/////////////////
//---------------connecting to MongoDB------------//
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:root@cluster0.usof1.mongodb.net/landscapeAUB?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {

        let countriesCollection = client.db("landscapeAUB").collection("countries");
        let categoriesCollection = client.db("landscapeAUB").collection("categories");
        let plantsCollection = client.db("landscapeAUB").collection("plants");
        // let plantsAKColletion = client.db("landscapeAUB").collection("plants-AK");
        let allPlantsCollection = client.db("landscapeAUB").collection("allPlants");
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
        app.get("/categories", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in countries");
            categoriesCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })
        //added by paul
        // app.get("/plants", (req, res) => {
        //     console.log(">>>>>>>>>>>>>>>>>>in plants");
        //     console.log(req.query.type);
        //     if (req.query.type=="all"){
        //         plantsCollection.find().toArray()
        //         .then(results => {
        //             res.send(results)
        //         })
        //         .catch(error => console.error(error))
        //     }
        //     else {
        //         plantsCollection.find({type: req.query.type}).toArray()
        //         .then(results => {
        //             res.send(results)
        //         })
        //         .catch(error => console.error(error))
                
        //     }

        // })
        app.get("/allplants", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in plants");
            console.log(req.query.type);
            if (req.query.type=="all"){
                allPlantsCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
            }
            else {
                allPlantsCollection.find({plantType: req.query.type}).toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
                
            }

        })

        app.get("/plantsfiltered", (req, res) => {

            console.log(">>>>>>>>>>>>>>>>>>in plantsfiltered");
            console.log(req.query.filter);
            if (req.query.filter=="fragrant"){
                allPlantsCollection.find({fragrant:{$in: ["scentFlowerPleasant", "scentFlowerUnpleasant"]}}).toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
            }
            else if(req.query.filter=="flowering"){
                allPlantsCollection.find({colorFlower: { $exists: true, $ne: [] }}).toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
                
            }
            else if(req.query.filter=="edible"){
                allPlantsCollection.find({edible:"yes"}).toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
            }
            else if(req.query.filter=="arid"){
                allPlantsCollection.find().toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
            }
            else if(req.query.filter=="shade"){
                allPlantsCollection.find({light:"Shade"}).toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
            }
            else if(req.query.filter=="Ground cover"){
                allPlantsCollection.find({plantType:"Ground Cover"}).toArray()
                .then(results => {
                    res.render("searchResults",{plants:results});
                })
                .catch(error => console.error(error))
            }
            else{
                res.send({})

            
            }

        })
        
        //route for plant filter by criteria
        app.post("/searchByCriteria", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in searchByCriteria");
            console.log(req.body)
            let filters = JSON.parse(req.body.sentFilters);
            // console.log(filters);

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
            allPlantsCollection.find(query).toArray()
                .then(results => {
                    console.log(results);
                    return res.render("searchResults",{plants:results});
                });
            //TODO: find partial matches

        })

        app.get("/plant", (req,res) => {
            let q = url.parse(req.url, true).query;
            let id = new require("mongodb").ObjectID(q.id);
            console.log(id);
            allPlantsCollection.find({"_id" : id}).toArray()
                .then(results => {
                    console.log(results);
                    if(results==""){
                        return res.send("no results");
                    }else{
                        return res.render("plantInfo", {plant: results[0]});
                    }
                });
        })

        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
