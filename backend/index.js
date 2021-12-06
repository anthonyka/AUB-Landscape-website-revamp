const express = require('express');
const app = express();
const fs = require('fs');
var nodemailer = require('nodemailer');
const multer = require("multer");
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
app.get("/AboutUs", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about_us.html'));
});
app.get("/ContactUs", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/contact_us.html'));
});
app.get("/Acknowledgments", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/acknowledgments.html'));
});
app.get("/QuickLinks", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/usefullinks.html'));
});
app.get("/Citing", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/citing.html'));
});
app.get("/Glossary", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/glossary.html'));
});

//admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin.html'));
})



/////////////////
//---------------connecting to MongoDB------------//
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Binary = mongo.Binary;

const { ObjectId } = require('bson');
const uri = "mongodb+srv://admin:root@cluster0.usof1.mongodb.net/landscapeAUB?retryWrites=true&w=majority";
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {

        let countriesCollection = client.db("landscapeAUB").collection("countries");
        let categoriesCollection = client.db("landscapeAUB").collection("categories");
        let allPlantsCollection = client.db("landscapeAUB").collection("allPlants");
        let messages = client.db("landscapeAUB").collection("messages");

        //mail client -- just for testing
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'landscapetest278@gmail.com',
                pass: 'CMPS278AUB'
            }
        });

        //Configuration for Multer
        const multerStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "public/images");
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname + '-' + Date.now());
            },
        });

        //Calling the "multer" Function
        const upload = multer({
            storage: multerStorage,
        });
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
            let sentFilters = new Object();
            sentFilters.category = req.query.filter;
            if (req.query.filter == "fragrant") {
                allPlantsCollection.find({ flowerScent: { $in: ["scentFlowerPleasant", "scentFlowerUnpleasant"] } }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "flowering") {
                allPlantsCollection.find({ colorFlower: { $exists: true, $ne: [] } }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
                    })
                    .catch(error => console.error(error))

            }
            else if (req.query.filter == "edible") {
                allPlantsCollection.find({ edible: "yes" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "arid") {
                allPlantsCollection.find({ water: "Low" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "shade") {
                allPlantsCollection.find({ light: "Shade" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
                    })
                    .catch(error => console.error(error))
            }
            else if (req.query.filter == "ground") {
                allPlantsCollection.find({ plantType: "Ground Cover" }).toArray()
                    .then(results => {
                        res.render("searchResults", { plants: results,  partial: -1, filters: sentFilters });
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
            console.log(filters)
            let sentFilters = new Object();
            let query = { $and: [] };

            if (filters.country != "") {
                query.$and.push({ country: filters.country });
                sentFilters.country = filters.country;
            }
            if (filters.plantType.length != 0) {
                query.$and.push({ plantType: { $in: filters.plantType } });
                sentFilters.plantType = filters.plantType;
            }
            if (filters.temperatures.length != 0) {
                query.$and.push({ temperatures: { $in: filters.temperatures } });
                sentFilters.temperatures = filters.temperatures;
            }
            if (filters.light.length != 0) {
                query.$and.push({ light: { $in: filters.light } });
                sentFilters.light = filters.light;
            }
            if (filters.water.length != 0) {
                query.$and.push({ water: { $in: filters.water } });
                sentFilters.water = filters.water;
            }
            if (filters.lifeCycle.length != 0) {
                query.$and.push({ lifeCycle: { $in: filters.lifeCycle } });
                sentFilters.lifeCycle = filters.lifeCycle;
            }
            if (filters.outdoor.length != 0) {
                query.$and.push({ outdoor: { $in: filters.outdoor } });
                sentFilters.outdoor = filters.outdoor;
            }
            if (filters.canopyShape.length != 0) {
                query.$and.push({ canopyShape: { $in: filters.canopyShape } });
                sentFilters.canopyShape = filters.canopyShape;
            }
            if (filters.plantHeight.length != 0) {
                query.$and.push({ plantHeight: { $in: filters.plantHeight } });
                sentFilters.plantHeight = filters.plantHeight;
            }
            if (filters.plantSpread.length != 0) {
                query.$and.push({ plantSpread: { $in: filters.plantSpread } });
                sentFilters.plantSpread = filters.plantSpread;
            }
            if (filters.plantColorGrow.length != 0) {
                query.$and.push({ plantColorGrow: { $in: filters.plantColorGrow } });
                sentFilters.plantColorGrow = filters.plantColorGrow;
            }
            if (filters.colorFlower.length != 0) {
                query.$and.push({ colorFlower: { $in: filters.colorFlower } });
                sentFilters.colorFlower = filters.colorFlower;
            }
            if (filters.flowerScent.length != 0) {
                query.$and.push({ flowerScent: { $in: filters.flowerScent } });
                sentFilters.flowerScent = filters.flowerScent;
            }
            if (filters.fruitColor.length != 0) {
                query.$and.push({ fruitColor: { $in: filters.fruitColor } });
                sentFilters.fruitColor = filters.fruitColor;
            }
            if (filters.trunkCrownshaft.length != 0) {
                query.$and.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
                sentFilters.trunkCrownshaft = filters.trunkCrownshaft;
            }
            if (filters.invasivePotential.length != 0) {
                query.$and.push({ invasivePotential: { $in: filters.invasivePotential } });
                sentFilters.invasivePotential = filters.invasivePotential;
            }


            let queryOr = { $or: [] };

            if (filters.country != "") {
                queryOr.$or.push({ country: filters.country });
                sentFilters.country = filters.country;
            }
            if (filters.plantType.length != 0) {
                queryOr.$or.push({ plantType: { $in: filters.plantType } });
                sentFilters.plantType = filters.plantType;
            }
            if (filters.temperatures.length != 0) {
                queryOr.$or.push({ temperatures: { $in: filters.temperatures } });
                sentFilters.temperatures = filters.temperatures;
            }
            if (filters.light.length != 0) {
                queryOr.$or.push({ light: { $in: filters.light } });
                sentFilters.light = filters.light;
            }
            if (filters.water.length != 0) {
                queryOr.$or.push({ water: { $in: filters.water } });
                sentFilters.water = filters.water;
            }
            if (filters.lifeCycle.length != 0) {
                queryOr.$or.push({ lifeCycle: { $in: filters.lifeCycle } });
                sentFilters.lifeCycle = filters.lifeCycle;
            }
            if (filters.outdoor.length != 0) {
                queryOr.$or.push({ outdoor: { $in: filters.outdoor } });
                sentFilters.outdoor = filters.outdoor;
            }
            if (filters.canopyShape.length != 0) {
                queryOr.$or.push({ canopyShape: { $in: filters.canopyShape } });
                sentFilters.canopyShape = filters.canopyShape;
            }
            if (filters.plantHeight.length != 0) {
                queryOr.$or.push({ plantHeight: { $in: filters.plantHeight } });
                sentFilters.plantHeight = filters.plantHeight;
            }
            if (filters.plantSpread.length != 0) {
                queryOr.$or.push({ plantSpread: { $in: filters.plantSpread } });
                sentFilters.plantSpread = filters.plantSpread;
            }
            if (filters.plantColorGrow.length != 0) {
                queryOr.$or.push({ plantColorGrow: { $in: filters.plantColorGrow } });
                sentFilters.plantColorGrow = filters.plantColorGrow;
            }
            if (filters.colorFlower.length != 0) {
                queryOr.$or.push({ colorFlower: { $in: filters.colorFlower } });
                sentFilters.colorFlower = filters.colorFlower;
            }
            if (filters.flowerScent.length != 0) {
                queryOr.$or.push({ flowerScent: { $in: filters.flowerScent } });
                sentFilters.flowerScent = filters.flowerScent;
            }
            if (filters.fruitColor.length != 0) {
                queryOr.$or.push({ fruitColor: { $in: filters.fruitColor } });
                sentFilters.fruitColor = filters.fruitColor;
            }
            if (filters.trunkCrownshaft.length != 0) {
                queryOr.$or.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
                sentFilters.trunkCrownshaft = filters.trunkCrownshaft;
            }
            if (filters.invasivePotential.length != 0) {
                queryOr.$or.push({ invasivePotential: { $in: filters.invasivePotential } });
                sentFilters.invasivePotential = filters.invasivePotential;
            }

            console.log(queryOr);
            
            if (query.$and.length == 0 && queryOr.$or.length == 0) {
                allPlantsCollection.find().toArray()
                    .then(results => {
                        console.log(results);
                        return res.render("searchResults", { plants: results, partial: -1, filters: sentFilters });
                    });
            }
            else {
                allPlantsCollection.find(query).toArray()
                    .then(results => {
                        allPlantsCollection.find(queryOr).toArray()
                            .then(resultsOr => {
                                //Partial: 0 -> all OR
                                //         -1 -> none
                                //         positive integer -> starting this index
                                if (results.length == 0) {
                                    return res.render("searchResults", { plants: resultsOr, partial: 0, filters: sentFilters });
                                } else {
                                    console.log(results.length);
                                    console.log("RESULTS OR before: >>>>>>");
                                    console.log(resultsOr.length);
                                    // resultsOr = resultsOr.filter(ar => !results.includes(ar));
                                    // console.log(">>>>>>>>>>or");
                                    // console.log(resultsOr.length);
                                    let partial=0;
                                    if(resultsOr.length==0){
                                        partial = -1
                                    }else{
                                        partial = results.length;
                                    }
                                    console.log(`partial: ${partial}`)
                                    let finalResult = results.concat(resultsOr);
                                    console.log(finalResult.length);
                                    finalResult = finalResult.filter((v,i,a)=>a.findIndex(t=>(t.ScientificName===v.ScientificName))===i)
                                    console.log(">>>>>>>>>>final");
                                    console.log(finalResult.length);
                                    console.log(finalResult)
                                    return res.render("searchResults", { plants: finalResult, partial: partial, filters: sentFilters });
                                }

                            })
                    });
            }

        })

        //route for plant filter by criteria
        app.post("/plantIdentification", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>plantId")
            let filters = JSON.parse(req.body.sentFilters);
            let sentFilters = new Object();

            let query = { $and: [] };

            if (filters.plantType.length != 0) {
                query.$and.push({ plantType: { $in: filters.plantType } });
                sentFilters.plantType = filters.plantType;
            }

            if (filters.canopyShape.length != 0) {
                query.$and.push({ canopyShape: { $in: filters.canopyShape } });
                sentFilters.canopyShape = filters.canopyShape;
            }
            if (filters.plantHeight.length != 0) {
                query.$and.push({ plantHeight: { $in: filters.plantHeight } });
                sentFilters.plantHeight = filters.plantHeight;
            }
            if (filters.plantSpread.length != 0) {
                query.$and.push({ plantSpread: { $in: filters.plantSpread } });
                sentFilters.plantSpread = filters.plantSpread;
            }
            if (filters.plantColorGrow.length != 0) {
                query.$and.push({ plantColorGrow: { $in: filters.plantColorGrow } });
                sentFilters.plantColorGrow = filters.plantColorGrow;
            }
            if (filters.colorFlower.length != 0) {
                query.$and.push({ colorFlower: { $in: filters.colorFlower } });
                sentFilters.colorFlower = filters.colorFlower;
            }
            if (filters.flowerScent.length != 0) {
                query.$and.push({ flowerScent: { $in: filters.flowerScent } });
                sentFilters.flowerScent = filters.flowerScent;
            }
            if (filters.fruitColor.length != 0) {
                query.$and.push({ fruitColor: { $in: filters.fruitColor } });
                sentFilters.fruitColor = filters.fruitColor;
            }
            if (filters.trunkCrownshaft.length != 0) {
                query.$and.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
                sentFilters.trunkCrownshaft = filters.trunkCrownshaft;
            }

            if (filters.leafType.length != 0) {
                query.$and.push({ leafType: { $in: filters.leafType } });
                sentFilters.leafType = filters.leafType;
            }
            if (filters.leafArrangement.length != 0) {
                query.$and.push({ leafArrangement: { $in: filters.leafArrangement } });
                sentFilters.leafArrangement = filters.leafArrangement;
            }

            let queryOr = { $or: [] };


            if (filters.plantType.length != 0) {
                queryOr.$or.push({ plantType: { $in: filters.plantType } });
                sentFilters.plantType = filters.plantType;
            }

            if (filters.canopyShape.length != 0) {
                queryOr.$or.push({ canopyShape: { $in: filters.canopyShape } });
                sentFilters.canopyShape = filters.canopyShape;
            }
            if (filters.plantHeight.length != 0) {
                queryOr.$or.push({ plantHeight: { $in: filters.plantHeight } });
                sentFilters.plantHeight = filters.plantHeight;
            }
            if (filters.plantSpread.length != 0) {
                queryOr.$or.push({ plantSpread: { $in: filters.plantSpread } });
                sentFilters.plantSpread = filters.plantSpread;
            }
            if (filters.plantColorGrow.length != 0) {
                queryOr.$or.push({ plantColorGrow: { $in: filters.plantColorGrow } });
                sentFilters.plantColorGrow = filters.plantColorGrow;
            }
            if (filters.colorFlower.length != 0) {
                queryOr.$or.push({ colorFlower: { $in: filters.colorFlower } });
                sentFilters.colorFlower = filters.colorFlower;
            }
            if (filters.flowerScent.length != 0) {
                queryOr.$or.push({ flowerScent: { $in: filters.flowerScent } });
                sentFilters.flowerScent = filters.flowerScent;
            }
            if (filters.fruitColor.length != 0) {
                queryOr.$or.push({ fruitColor: { $in: filters.fruitColor } });
                sentFilters.fruitColor = filters.fruitColor;
            }
            if (filters.trunkCrownshaft.length != 0) {
                queryOr.$or.push({ trunkCrownshaft: { $in: filters.trunkCrownshaft } });
                sentFilters.trunkCrownshaft = filters.trunkCrownshaft;
            }

            if (filters.leafType.length != 0) {
                queryOr.$or.push({ leafType: { $in: filters.leafType } });
                sentFilters.leafType = filters.leafType;
            }
            if (filters.leafArrangement.length != 0) {
                queryOr.$or.push({ leafArrangement: { $in: filters.leafArrangement } });
                sentFilters.leafArrangement = filters.leafArrangement;
            }

            console.log(query);
            console.log(queryOr);
            if (query.$and.length == 0 && queryOr.$or.length == 0) {
                console.log("both empty")
                allPlantsCollection.find().toArray()
                    .then(results => {
                        console.log(results);
                        return res.render("searchResults", { plants: results, partial: 0, filters: sentFilters });
                    });
            }
            else {
                allPlantsCollection.find(query).toArray()
                    .then(results => {
                        allPlantsCollection.find(queryOr).toArray()
                            .then(resultsOr => {
                                if (results.length == 0) {
                                    return res.render("searchResults", { plants: resultsOr, partial: 0, filters: sentFilters });
                                } else {
                                    console.log(results.length);
                                    console.log("RESULTS OR before: >>>>>>");
                                    console.log(resultsOr.length);
                                    // resultsOr = resultsOr.filter(ar => !results.includes(ar));
                                    // console.log(">>>>>>>>>>or");
                                    // console.log(resultsOr.length);
                                    let partial=0;
                                    if(resultsOr.length==0){
                                        partial = -1
                                    }else{
                                        partial = results.length;
                                    }
                                    console.log(`partial: ${partial}`)
                                    let finalResult = results.concat(resultsOr);
                                    console.log(finalResult.length);
                                    finalResult = finalResult.filter((v,i,a)=>a.findIndex(t=>(t.ScientificName===v.ScientificName))===i)
                                    console.log(">>>>>>>>>>final");
                                    console.log(finalResult)
                                    return res.render("searchResults", { plants: finalResult, partial: partial, filters: sentFilters });
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

        app.get("/SearchByName", (req, res) => {
            console.log(">>>>>>>>>>>>>>>>>>in searchByName");
            res.render(path.join(__dirname, 'public/search_by_name.ejs'));

        })
        app.get("/names", (req, res) => {
            console.log(req.query);
            let Scientific_Name = req.query.Scientific_Name;
            /*f(Scientific_Name!=""){
                Scientific_Name=Scientific_Name.trim();
                Scientific_Name=Scientific_Name.replaceAll(","," ");
                Scientific_Name=Scientific_Name.replaceAll("\'","");
                Scientific_Name=Scientific_Name.replaceAll(/\s+/g," ");
            }*/
            let Common_Name = req.query.Common_Name;
            /*if(Common_Name!=""){
                Common_Name=Common_Name.trim();
                Common_Name=Common_Name.replaceAll(","," ");
                Common_Name=Common_Name.replaceAll("\'"," ");
                Common_Name=Common_Name.replaceAll(/\s+/g," ");
            }*/
            let queryOr = { $or: [] };
            if (Scientific_Name!=""){
                queryOr.$or.push({ScientificName: {$regex:"^"+Scientific_Name,$options:'i'}});
            }
            if (Common_Name!=""){
                queryOr.$or.push({CommonEnglishName : {$regex:"^"+Common_Name,$options:'i'}});
            }
            if(Scientific_Name==""&& Common_Name==""){
                queryOr.$or.push({CommonEnglishName: ""});
            }
            
            allPlantsCollection.find().forEach(function(x){
                EnglishMongo=x.CommonEnglishName;
                EnglishMongo=(EnglishMongo.toString()).replaceAll(","," ");
                EnglishMongo=EnglishMongo.replaceAll("\'","");
                EnglishMongo=EnglishMongo.replaceAll(/\s+/g," ");
                //console.log(EnglishMongo);
            })

            allPlantsCollection.find(queryOr).toArray()
            .then(results => {
                //console.log(results);
                console.log(queryOr.$or.ScientificName);
                return res.render("searchResults", { plants: results, partial: -1, filters:{ScientificName: Scientific_Name, CommonName: Common_Name} });
            });
        
        })

        app.get('/SearchByLetter', (req, res) => {
            var q = url.parse(req.url, true).query;
            var letter = q.letter;
            allPlantsCollection.find({ ScientificName: { '$regex': "^" + letter.toString() } }).toArray()
                .then(results => {
                    console.log(results);
                    res.render('searchResults', { plants: results,  partial: -1, filters: {letter: letter} });
                })
                .catch(error => console.error(error))
        });

        app.post("/sendMessage", upload.single('upload'), (req, res) => {
            if (req.file != null) {
                messages.insertOne({
                    name: req.body.name,
                    company: req.body.companyName,
                    email: req.body.email,
                    phone: req.body.phone,
                    country: req.body.country,
                    subject: req.body.subject,
                    comments: req.body.comments,
                    answered: "",
                    file: req.file.filename,
                });
            } else {
                messages.insertOne({
                    name: req.body.name,
                    company: req.body.companyName,
                    email: req.body.email,
                    phone: req.body.phone,
                    country: req.body.country,
                    subject: req.body.subject,
                    comments: req.body.comments,
                    answered: "",
                    file: ""
                });
            }

            res.redirect("/ContactUs");
        })

        //-------------------admin----------------------//
        app.get("/getFields", (req, res) => {
            console.log(req.query);
            let q = req.query.collection;
            console.log(q)
            let collection = client.db("landscapeAUB").collection(q);

            collection.aggregate([
                { "$project": { "arrayofkeyvalue": { "$objectToArray": "$$ROOT" } } },
                { "$unwind": "$arrayofkeyvalue" },
                { "$group": { "_id": null, "allkeys": { "$addToSet": "$arrayofkeyvalue.k" } } }
            ]).toArray()
                .then(results => {
                    res.send(results[0].allkeys);
                })
                .catch(err => console.log(err));
        })

        app.get("/getCollections", (req, res) => {

            client.db("landscapeAUB").listCollections().toArray()
                .then(results => {
                    results = results.filter(collection => collection.name != 'messages');
                    results = results.filter(collection => collection.name != 'categories');
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
            client.db("landscapeAUB").collection(collectionName).updateMany({}, { $rename: edits })
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
            client.db("landscapeAUB").collection(collectionName).updateMany({}, { $set: { newField: "" } })
            console.log(field);
            res.sendStatus(200);

        })

        app.get("/getDocuments", (req, res) => {
            console.log(req.query);
            let q = req.query.collection;
            console.log(q)
            let collection = client.db("landscapeAUB").collection(q);

            collection.find().toArray()
                .then(results => {
                    res.send(results);
                })
                .catch(err => console.log(err));
        })

        app.post("/changeDocument", (req, res) => {
            console.log(req.body);
            let edits = req.body;

            console.log(">>>>>>>>>>>>>>>>>change document")
            let collectionName = edits.collection;
            let id = edits._id;
            delete edits.collection;
            delete edits._id;
            console.log(edits)
            client.db("landscapeAUB").collection(collectionName).updateOne({ _id: new require("mongodb").ObjectId(id) }, { $set: edits })
            res.sendStatus(200);

        })

        app.get("/deleteDocument", (req, res) => {
            console.log(req.query);
            let q = req.query.collection;
            let id = req.query.id;
            let file=0;
            if(req.query.filePath){
                file =req.query.filePath;
            }
            console.log(id)
            let collection = client.db("landscapeAUB").collection(q);
            
            collection.deleteOne({ _id: new require("mongodb").ObjectId(id) })
                .then(results => {
                    if(file){
                        fs.unlinkSync("public/images/"+file);
                    }
                    res.send(results);
                })
                .catch(err => console.log(err));
        })

        app.post("/addDocument", (req, res) => {
            console.log(req.body);
            let doc = req.body;

            console.log(">>>>>>>>>>>>>>>>>add document")
            let collectionName = doc.collection;
            delete doc.collection;
            delete doc._id;
            console.log(doc)
            client.db("landscapeAUB").collection(collectionName).insertOne(doc)
            res.sendStatus(200);

        })

        // app.post("/addDocumentImages", upload.fields([{ name: 'Image0', maxCount: 1 }, { name: 'Image1', maxCount: 1 }, { name: 'Image2', maxCount: 1 }, { name: 'Image3', maxCount: 1 }, { name: 'Image4', maxCount: 1 }]), (req, res) => {
        //     console.log("addDocImages");
        //     let doc = req.files;
        //     console.log(doc);
        // })

        app.get("/getMessages", (req, res) => {
            console.log(req.query);
            let filter = req.query.filter;

            if (filter == "View Pending") {
                messages.find({ answered: "" }).toArray()
                    .then(results => {
                        res.send(results);
                    })
                    .catch(err => console.log(err));
            } else if (filter == "View Answered") {
                messages.find({ answered: "true" }).toArray()
                    .then(results => {
                        res.send(results);
                    })
                    .catch(err => console.log(err));
            } else {
                messages.find().toArray()
                    .then(results => {
                        res.send(results);
                    })
                    .catch(err => console.log(err));
            }

        })

        app.get("/sendResponse", (req, res) => {
            console.log(req.query);
            let id = req.query.id;
            let response = req.query.response;
            let subject = req.query.subject;
            let to = req.query.to;
            var mailOptions = {
                from: 'landscapetest278@gmail.com',
                to: to,
                subject: "RE: " + subject,
                text: response
            };

            messages.updateOne({ _id: new require("mongodb").ObjectId(id) }, { $set: { response: response, answered: "true" } })
                .then(resp => {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.sendStatus(200);
                        }
                    });
                })

        })



        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

//------------ADMIN-------------//
