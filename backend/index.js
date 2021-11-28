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
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
})
app.get('/pants_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/image_gallery.html'));
})
app.get('/searchByCriteria', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/search_by_criteria.html'));
})
app.get('/plantIdentification', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/plant_identification.html'));
})
app.get('/popular_pants_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/popular_plants.html'));
})
app.get('/popular_pants_page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/popular_plants2.html'));
})

//admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin.html'));
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
            if (req.query.type == "all") {
                allPlantsCollection.find().toArray()
                    .then(results => {
                        res.send(results)
                    })
                    .catch(error => console.error(error))
            }
            else {
                allPlantsCollection.find({ plantType: req.query.type }).toArray()
                    .then(results => {
                        res.send(results)
                    })
                    .catch(error => console.error(error))

            }

        })

        app.get("/plantsfiltered", (req, res) => {

            console.log(">>>>>>>>>>>>>>>>>>in plantsfiltered");
            console.log(req.query.filter);
            if (req.query.filter == "fragrant") {
                allPlantsCollection.find({ fragrant: { $in: ["scentFlowerPleasant", "scentFlowerUnpleasant"] } }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "flowering") {
                allPlantsCollection.find({ colorFlower: { $exists: true, $ne: [] } }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))

            }
            else if (req.query.filter == "edible") {
                allPlantsCollection.find({ edible: "yes" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "arid") {
                allPlantsCollection.find().toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "shade") {
                allPlantsCollection.find({ light: "Shade" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "Ground cover") {
                allPlantsCollection.find({ plantType: "Ground Cover" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results });
                    })
                    .catch(error => console.error(error))
            }
            else {
                res.send({})


            }

        })

        //route for plant filter by criteria
        app.post("/searchByCriteria", (req, res) => {
            let filters = JSON.parse(req.body.sentFilters);
            console.log(">>>>>>>>>>>>>>>>>searchByCrit")

            let query = { $and: [] };
            
            if (filters.country != "") {
                query.$and.push({ country: filters.country });
            }
            if (filters.plantType.length != 0) {
                query.$and.push({ plantType: { $in: filters.plantType } });
            }
            if (filters.temperatures.length != 0) {
                query.$and.push({ temperatures: { $in: filters.temperatures } });
            }
            if (filters.light.length != 0) {
                query.$and.push({ light: { $in: filters.light } });
            }
            if (filters.water.length != 0) {
                query.$and.push({ water: { $in: filters.water } });
            }
            if (filters.lifeCycle.length != 0) {
                query.$and.push({ lifeCycle: { $in: filters.lifeCycle } });
            }
            if (filters.outdoor.length != 0) {
                query.$and.push({ outdoor: { $in: filters.outdoor } });
            }
            if (filters.canopyShape.length != 0) {
                query.$and.push({ canopyShape: { $in: filters.canopyShape } });
            }
            if (filters.plantHeight.length != 0) {
                query.$and.push({ plantHeight: { $in: filters.plantHeight } });
            }
            if (filters.plantSpread.length != 0) {
                query.$and.push({ plantSpread: { $in: filters.plantSpread } });
            }
            if (filters.plantColorGrow.length != 0) {
                query.$and.push({ plantColorGrow: { $in: filters.plantColorGrow } });
            }
            if (filters.colorFlower.length != 0) {
                query.$and.push({ colorFlower: { $in: filters.colorFlower } });
            }
            if (filters.flowerScent.length != 0) {
                query.$and.push({ flowerScent: { $in: filters.flowerScent } });
            }
            if (filters.fruitColor.length != 0) {
                query.$and.push({ fruitColor: { $in: filters.fruitColor } });
            }
            if (filters.trunkCrownshaft.length != 0) {
                query.$and.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
            }
            if (filters.invasivePotential.length != 0) {
                query.$and.push({ invasivePotential: { $in: filters.invasivePotential } });
            }
            

            let queryOr = { $or: [] };

            if (filters.country != "") {
                queryOr.$or.push({ country: filters.country });
            }
            if (filters.plantType.length != 0) {
                queryOr.$or.push({ plantType: { $in: filters.plantType } });
            }
            if (filters.temperatures.length != 0) {
                queryOr.$or.push({ temperatures: { $in: filters.temperatures } });
            }
            if (filters.light.length != 0) {
                queryOr.$or.push({ light: { $in: filters.light } });
            }
            if (filters.water.length != 0) {
                queryOr.$or.push({ water: { $in: filters.water } });
            }
            if (filters.lifeCycle.length != 0) {
                queryOr.$or.push({ lifeCycle: { $in: filters.lifeCycle } });
            }
            if (filters.outdoor.length != 0) {
                queryOr.$or.push({ outdoor: { $in: filters.outdoor } });
            }
            if (filters.canopyShape.length != 0) {
                queryOr.$or.push({ canopyShape: { $in: filters.canopyShape } });
            }
            if (filters.plantHeight.length != 0) {
                queryOr.$or.push({ plantHeight: { $in: filters.plantHeight } });
            }
            if (filters.plantSpread.length != 0) {
                queryOr.$or.push({ plantSpread: { $in: filters.plantSpread } });
            }
            if (filters.plantColorGrow.length != 0) {
                queryOr.$or.push({ plantColorGrow: { $in: filters.plantColorGrow } });
            }
            if (filters.colorFlower.length != 0) {
                queryOr.$or.push({ colorFlower: { $in: filters.colorFlower } });
            }
            if (filters.flowerScent.length != 0) {
                queryOr.$or.push({ flowerScent: { $in: filters.flowerScent } });
            }
            if (filters.fruitColor.length != 0) {
                queryOr.$or.push({ fruitColor: { $in: filters.fruitColor } });
            }
            if (filters.trunkCrownshaft.length != 0) {
                queryOr.$or.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
            }
            if (filters.invasivePotential.length != 0) {
                queryOr.$or.push({ invasivePotential: { $in: filters.invasivePotential } });
            }

            console.log(queryOr);
            //TODO: this now works, just need to send the info to a view engine or frontend for rendering
            //finding all that match
            if (query.$and.length == 0 && queryOr.$or.length == 0) {
                allPlantsCollection.find().toArray()
                    .then(results => {
                        console.log(results);
                        return res.render("searchResults", { plants: results });
                    });
            }
            else {
                allPlantsCollection.find(query).toArray()
                    .then(results => {
                        allPlantsCollection.find(queryOr).toArray()
                            .then(resultsOr => {
                                // let commonElements = resultsOr.filter(v => results.includes(v));
                                // console.log(">>>>>>>>>>common");
                                // console.log(commonElements);
                                if (results.length == 0) {
                                    return res.render("searchResults", { plants: resultsOr });
                                } else {
                                    resultsOr = results.filter(ar => !results.find(rm => (rm._id === ar._id)));
                                    console.log(">>>>>>>>>>or");
                                    console.log(resultsOr);
                                    let finalResult = results.concat(resultsOr);
                                    console.log(">>>>>>>>>>final");
                                    console.log(finalResult)
                                    return res.render("searchResults", { plants: finalResult });
                                }

                            })
                    });
            }

        })

        //route for plant filter by criteria
        app.post("/plantIdentification", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>plantId")
            let filters = JSON.parse(req.body.sentFilters);

            let query = { $and: [] };
            
            if (filters.plantType.length != 0) {
                query.$and.push({ plantType: { $in: filters.plantType } });
            }
            
            if (filters.canopyShape.length != 0) {
                query.$and.push({ canopyShape: { $in: filters.canopyShape } });
            }
            if (filters.plantHeight.length != 0) {
                query.$and.push({ plantHeight: { $in: filters.plantHeight } });
            }
            if (filters.plantSpread.length != 0) {
                query.$and.push({ plantSpread: { $in: filters.plantSpread } });
            }
            if (filters.plantColorGrow.length != 0) {
                query.$and.push({ plantColorGrow: { $in: filters.plantColorGrow } });
            }
            if (filters.colorFlower.length != 0) {
                query.$and.push({ colorFlower: { $in: filters.colorFlower } });
            }
            if (filters.flowerScent.length != 0) {
                query.$and.push({ flowerScent: { $in: filters.flowerScent } });
            }
            if (filters.fruitColor.length != 0) {
                query.$and.push({ fruitColor: { $in: filters.fruitColor } });
            }
            if (filters.trunkCrownshaft.length != 0) {
                query.$and.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
            }
            
            if (filters.leafType.length != 0) {
                query.$and.push({ leafType: { $in: filters.leafType } });
            }
            if (filters.leafArrangement.length != 0) {
                query.$and.push({ leafArrangement: { $in: filters.leafArrangement } });
            }

            let queryOr = { $or: [] };

            
            if (filters.plantType.length != 0) {
                queryOr.$or.push({ plantType: { $in: filters.plantType } });
            }
            if (filters.canopyShape.length != 0) {
                queryOr.$or.push({ canopyShape: { $in: filters.canopyShape } });
            }
            if (filters.plantHeight.length != 0) {
                queryOr.$or.push({ plantHeight: { $in: filters.plantHeight } });
            }
            if (filters.plantSpread.length != 0) {
                queryOr.$or.push({ plantSpread: { $in: filters.plantSpread } });
            }
            if (filters.plantColorGrow.length != 0) {
                queryOr.$or.push({ plantColorGrow: { $in: filters.plantColorGrow } });
            }
            if (filters.colorFlower.length != 0) {
                queryOr.$or.push({ colorFlower: { $in: filters.colorFlower } });
            }
            if (filters.flowerScent.length != 0) {
                queryOr.$or.push({ flowerScent: { $in: filters.flowerScent } });
            }
            if (filters.fruitColor.length != 0) {
                queryOr.$or.push({ fruitColor: { $in: filters.fruitColor } });
            }
            if (filters.trunkCrownshaft.length != 0) {
                queryOr.$or.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
            }
            if (filters.leafType.length != 0) {
                queryOr.$or.push({ leafType: { $in: filters.leafType } });
            }
            if (filters.leafArrangement.length != 0) {
                queryOr.$or.push({ leafArrangement: { $in: filters.leafArrangement } });
            }

            console.log(query);
            console.log(queryOr);
            //TODO: this now works, just need to send the info to a view engine or frontend for rendering
            //finding all that match
            if (query.$and.length == 0 && queryOr.$or.length == 0) {
                console.log("both empty")
                allPlantsCollection.find().toArray()
                    .then(results => {
                        console.log(results);
                        return res.render("searchResults", { plants: results });
                    });
            }
            else {
                allPlantsCollection.find(query).toArray()
                    .then(results => {
                        allPlantsCollection.find(queryOr).toArray()
                            .then(resultsOr => {
                                // let commonElements = resultsOr.filter(v => results.includes(v));
                                // console.log(">>>>>>>>>>common");
                                // console.log(commonElements);
                                if (results.length == 0) {
                                    return res.render("searchResults", { plants: resultsOr });
                                } else {
                                    resultsOr = results.filter(ar => !results.find(rm => (rm._id === ar._id)));
                                    console.log(">>>>>>>>>>or");
                                    console.log(resultsOr);
                                    let finalResult = results.concat(resultsOr);
                                    console.log(">>>>>>>>>>final");
                                    console.log(finalResult)
                                    return res.render("searchResults", { plants: finalResult });
                                }

                            })
                    });
            }

        })

        app.get("/plant", (req, res) => {
            let q = url.parse(req.url, true).query;
            let id = new require("mongodb").ObjectID(q.id);
            console.log(id);
            allPlantsCollection.find({ "_id": id }).toArray()
                .then(results => {
                    console.log(results);
                    if (results == "") {
                        return res.send("no results");
                    } else {
                        return res.render("plantInfo", { plant: results[0] });
                    }
                });
        })
        /*app.get("/SearchByName", (req,res) => {
            
        })*/

        //-------------------admin----------------------//
        app.get("/getFields",(req,res)=>{
            console.log(req.query);
            let q = req.query.collection;
            console.log(q)
            let collection = client.db("landscapeAUB").collection(q);
            
            collection.aggregate([
                {"$project":{"arrayofkeyvalue":{"$objectToArray":"$$ROOT"}}},
                {"$unwind":"$arrayofkeyvalue"},
                {"$group":{"_id":null,"allkeys":{"$addToSet":"$arrayofkeyvalue.k"}}}
              ]).toArray()
              .then(results => {
                  res.send(results[0].allkeys);
              })
              .catch(err => console.log(err));
        })

        app.get("/getCollections",(req,res)=>{
            
            client.db("landscapeAUB").listCollections().toArray()
            .then(results => {
                res.send(results)
            })
            .catch(error => console.error(error))
        })

        app.post("/changeFields", (req, res) => {
            console.log(req.body);
            let edits = req.body;
            
            console.log(">>>>>>>>>>>>>>>>>edit fields")
            let collectionName = edits.collection;
            console.log(collectionName)
            delete edits.collection;
            console.log(edits)
            client.db("landscapeAUB").collection(collectionName).updateMany( {}, { $rename: edits } )
            console.log(edits);
            res.sendStatus(200);

        })

        app.post("/addField", (req, res) => {
            console.log(req.body);
            let field = req.body;
            
            console.log(">>>>>>>>>>>>>>>>>add fields")
            let collectionName = field.collection;
            console.log(collectionName)
            delete field.collection;
            console.log(field)
            let newField = field.newField;
            client.db("landscapeAUB").collection(collectionName).updateMany( {}, { $set: {newField: ""} } )
            console.log(field);
            res.sendStatus(200);

        })

        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
