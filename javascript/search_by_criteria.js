//------------------map creation start-----------------//
const backendDomain = "http://localhost:3000";
const domainImages = "https://landscapeplants.aub.edu.lb/images/search/plant/";
const domainColorImages = "https://landscapeplants.aub.edu.lb/images/search/";
const plantTypeMap = new Map();
plantTypeMap.set("Cactus/Succulent", domainImages + "CactusSucculent.png");
plantTypeMap.set("Ground Cover", domainImages + "GroundCover.png");
plantTypeMap.set("Lawn", domainImages + "Lawn-palnt.png");
plantTypeMap.set("Palm", domainImages + "Palm.png");
plantTypeMap.set("Shrub", domainImages + "Shrub.png");
plantTypeMap.set("Tree", domainImages + "Trees.png");
plantTypeMap.set("Vine", domainImages + "Vines.png");

const lightMap = new Map();
lightMap.set("Full", domainImages + "full.png");
lightMap.set("Part", domainImages + "part.png");
lightMap.set("Shade", domainImages + "shade.png");

const soilMap = new Map();
soilMap.set("Clay", domainImages + "clay.png");
soilMap.set("Sand", domainImages + "sand.png");
soilMap.set("Loam", domainImages + "loam.png");

const waterMap = new Map();
waterMap.set("High", domainImages + "water-high.png");
waterMap.set("Moderate", domainImages + "moderate.png");
waterMap.set("Low", domainImages + "water-low.png");

const canopyShapeMap = new Map();
canopyShapeMap.set("Weeping", domainImages + "Weeping.png");
canopyShapeMap.set("Upright/Erect", domainImages + "Upright.png");
canopyShapeMap.set("Vase", domainImages + "Vase.png");
canopyShapeMap.set("Pyramidal", domainImages + "Pyramidal.png");
canopyShapeMap.set("Rounded", domainImages + "Rounded.png");
canopyShapeMap.set("Columnar", domainImages + "Columnar.png");
canopyShapeMap.set("Oval", domainImages + "Oval.png");
canopyShapeMap.set("Palm", domainImages + "Palm.png");
canopyShapeMap.set("Spreading", domainImages + "Spreading.png");

const colorGrowMap = new Map();
colorGrowMap.set("Green", domainColorImages + "green.png");
colorGrowMap.set("Purple", domainColorImages + "purple.png");
colorGrowMap.set("Red", domainColorImages + "red.png");
colorGrowMap.set("Yellow", domainColorImages + "yellow.png");
colorGrowMap.set("Blue/Blue-green", domainColorImages + "blue.png");
colorGrowMap.set("Silver", domainColorImages + "silver.png");
colorGrowMap.set("Variegtaed", domainColorImages + "variegat.png");

const colorChangeMap = new Map();
colorChangeMap.set("Green", domainColorImages + "green.png");
colorChangeMap.set("Purple", domainColorImages + "purple.png");
colorChangeMap.set("Red", domainColorImages + "red.png");
colorChangeMap.set("Yellow", domainColorImages + "yellow.png");
colorChangeMap.set("Orange", domainColorImages + "orange.png");
colorChangeMap.set("Brown", domainColorImages + "brown.png");
colorChangeMap.set("Copper", domainColorImages + "copper.png");

const flowerColorMap = new Map();
flowerColorMap.set("White/Creamy", domainColorImages + "f-white.png");
flowerColorMap.set("Pink", domainColorImages + "f-pink.png");
flowerColorMap.set("Purple", domainColorImages + "f-purple.png");
flowerColorMap.set("Blue", domainColorImages + "f-blue.png");
flowerColorMap.set("Red", domainColorImages + "f-red.png");
flowerColorMap.set("Green", domainColorImages + "f-green.png");
flowerColorMap.set("Yellow", domainColorImages + "f-yellow.png");
flowerColorMap.set("Orange", domainColorImages + "f-orange.png");
flowerColorMap.set("Brown", domainColorImages + "f-brown.png");

const fruitColorMap = new Map();
fruitColorMap.set("White", domainColorImages + "fruit-white.png");
fruitColorMap.set("Pink", domainColorImages + "fruit-pink.png");
fruitColorMap.set("Purple", domainColorImages + "fruit-purple.png");
fruitColorMap.set("Blue", domainColorImages + "fruit-blue.png");
fruitColorMap.set("Red", domainColorImages + "fruit-red.png");
fruitColorMap.set("Green", domainColorImages + "fruit-green.png");
fruitColorMap.set("Yellow", domainColorImages + "fruit-yellow.png");
fruitColorMap.set("Orange", domainColorImages + "fruit-orange.png");
fruitColorMap.set("Brown", domainColorImages + "fruit-brown.png");
fruitColorMap.set("Gray", domainColorImages + "fruit-gray.png");
fruitColorMap.set("Black", domainColorImages + "fruit-black.png");

//JS object to send
function filters(country, temperatures, plantType, light, soil, water, soilPH,
    tolerance, lifeCycle, outdoor, specialized, nativeEnvironment,
    humanUse, building, canopyShape, plantHeight, plantSpread,
    timeToHeight, growthRate, colorPlantGrow, colorPlantChange, persistence,
    PlantScent, colorFlower, flowerSeason, flowerScent, flowerShowiness,
    fruitColor, fruitShowiness, fruitSeason, fruitSize, trunkEsthetic, crownshaft,
    edible, litter, rooting, toxicity, invasivePotential, diseases, pruning, lifeSpan ) {
    this.country = country;this.temperatures = temperatures;this.plantType = plantType;
    this.light = light;this.soil = soil;this.water = water;this.tolerance = tolerance;this.lifeCycle = lifeCycle;this.outdoor = outdoor;this.specialized = specialized;
    this.nativeEnvironment = nativeEnvironment;this.humanUse = humanUse;this.building = building;this.canopyShape = canopyShape;this.plantHeight = plantHeight;this.plantSpread = plantSpread;
    this.timeToHeight = timeToHeight;this.growthRate = growthRate;this.colorPlantGrow = colorPlantGrow; this.colorPlantChange = colorPlantChange;
    this.persistence = persistence;this.PlantScent = PlantScent;this.colorFlower = colorFlower;this.flowerSeason = flowerSeason;this.flowerScent = flowerScent;
    this.flowerShowiness = flowerShowiness;this.fruitColor = fruitColor;this.fruitShowiness = fruitShowiness;
    this.fruitSeason = fruitSeason;this.fruitSize = fruitSize;this.trunkEsthetic = trunkEsthetic;
    this.crownshaft = crownshaft;this.edible = edible;this.litter = litter;this.rooting = rooting;this.toxicity = toxicity;this.invasivePotential = invasivePotential;
    this.diseases = diseases;this.pruning = pruning;this.lifeSpan = lifeSpan; this.soilPH = this.soilPH
}

let filter = new filters();

//-------------------map creation end---------------------//
window.onload = function () {
    getCountries();
    initializeTooltips();
    createPlantType();
    createLight();
    createSoil();
    createWater();
    createCanopyShape();
    createColorGrow();
    createColorChange();
    createFlowerColor();
    createFruitColor();
    hideAndUnhide();

    let submitButton = getID("submitButton");
    submitButton.addEventListener("click",sendFilters);

    let resetButton = getID("resetButton");
    resetButton.addEventListener("click",function () {
        window.location.reload();
    });
}





//-----------DOM mod functions----------//

//countries
function genCountriesDropDown(countries) {
    let countryDD = getID("country-dropdown");
    for (let index = 0; index < countries.length; index++) {
        let country = countries[index];
        let item = createDDItemCountry(country);
        countryDD.appendChild(item);
    }
}
//country
function createDDItemCountry(country) {
    let item = document.createElement("a");
    item.classList.add("dropdown-item");
    item.setAttribute('href', "#");
    item.id = "countryDD-" + country.name;
    item.innerHTML = country.name;

    item.addEventListener("click", function () {
        getID("countryDropDownButton").innerHTML = this.text;
        filter.country = this.text;
        showImage(this);
        genTemperatureDD(country);
    })
    return item;
}
//climate
function genTemperatureDD(country) {
    //reset temps
    let temperatureDiv = getID("temperatureSelect");
    temperatureDiv.style.display = "none";
    let temperatureDropDown = getID("temperature-dropdown");
    temperatureDropDown.innerHTML = "";
    let temp = country.temperatures;
    let tempDD = getID("temperature-dropdown");
    for (let index = 0; index < temp.length; index++) {
        let item = createDDItemTemp(temp[index]);
        tempDD.appendChild(item);
    }
    getID("temperatureSelect").style.display = "block";
}

function createDDItemTemp(text) {
    let div = document.createElement("div");
    let check = document.createElement("input");
    let temp = document.createElement("label");

    temp.innerHTML = text;
    temp.classList.add("temperatures-colors");
    temp.classList.add("form-check-label");
    temp.setAttribute("for", "checkboxTemp" + text)
    temp.style.backgroundColor = temperatureColor(text);

    check.classList.add("form-check-input");
    check.setAttribute("type", "checkbox");
    check.value = text;
    check.id = "checkboxTemp" + text;

    div.classList.add("form-check");

    div.appendChild(check);
    div.appendChild(temp);

    return div;
}

function showImage(country) {
    let countryMap = getID("country-map");
    let countryMapImg = countryMap.querySelector("img");
    // countryMap.style.display = "block";
    countryMapImg.setAttribute('src', 'https://landscapeplants.aub.edu.lb/Images/CountryClimateMaps/' + country.text + '.png');
    countryMapImg.setAttribute('alt', 'Temperature Map of ' + country.text);
}

function temperatureColor(temp) {
    temp = parseFloat(temp);
    if (temp >= 30) {
        return "red";
    } else if (temp >= 25) {
        return "orange";
    } else if (temp >= 20) {
        return "yellow";
    } else {
        return "green";
    }
}

//create filter box
function selectFilter() {
    if (this.getAttribute("selected") == "true") {
        if (this.parentNode == getID("plantColorGrow") || this.parentNode == getID("plantColorChange")) {
            this.classList.add("colorBoxWithImageText");
            this.classList.remove("colorBoxWithImageTextSelected")
        } else {
            this.classList.add("boxWithImageText");
            this.classList.remove("boxWithImageTextSelected")
            if (this == getID("light") || this == getID("soil") || this == getID("water")) {
                this.classList.add("boxWithImageTextSmall");
            }
        }

        this.setAttribute("selected", "false");
    } else {
        if (this.parentNode == getID("plantColorGrow") || this.parentNode == getID("plantColorChange")) {
            this.classList.add("colorBoxWithImageTextSelected");
            this.classList.remove("colorBoxWithImageText")
        } else {
            this.classList.remove("boxWithImageText")
            this.classList.add("boxWithImageTextSelected");
            if (this == getID("light") || this == getID("soil") || this == getID("water")) {
                this.classList.add("boxWithImageTextSmall");
            }
        }

        this.setAttribute("selected", "true");
    }
}

//populate plant type
function createPlantType() {
    let plantType = getID("plantType");
    createFilterBoxes(plantType, plantTypeMap);
}

//populate light
function createLight() {
    let light = getID("light");
    createFilterBoxes(light, lightMap);
}

//populate soil
function createSoil() {
    let soil = getID("soil");
    createFilterBoxes(soil, soilMap);
}

//populate water
function createWater() {
    let water = getID("water");
    createFilterBoxes(water, waterMap);
}

// populate canopy shape
function createCanopyShape() {
    let canopyShape = getID("canopyShape");
    createFilterBoxes(canopyShape, canopyShapeMap);
}

//populate color grow type
function createColorGrow() {
    let colorGrow = getID("plantColorGrow");
    createFilterBoxes(colorGrow, colorGrowMap);
}

//populate color change type
function createColorChange() {
    let colorChange = getID("plantColorChange");
    createFilterBoxes(colorChange, colorChangeMap);
}

// populate flower color
function createFlowerColor() {
    let flowerColor = getID("plantFlowerColor");
    createFilterBoxes(flowerColor, flowerColorMap);
}

// populate fruit color
function createFruitColor() {
    let fruitColor = getID("fruitColor");
    createFilterBoxes(fruitColor, fruitColorMap);
}

//other
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function createFilterBoxes(parentDiv, usedMap) {
    for (let [key, value] of usedMap) {
        let div = document.createElement("div");
        if (usedMap == colorChangeMap || usedMap == colorGrowMap) {
            div.classList.add("colorBoxWithImageText");
        } else {
            div.classList.add("boxWithImageText");
            if (usedMap == lightMap || usedMap == soilMap || usedMap == waterMap) {
                div.classList.add("boxWithImageTextSmall");
            }
        }


        let image = document.createElement("img");
        image.src = value;
        let text = document.createElement("p");
        text.innerHTML = key;
        div.appendChild(image);
        div.appendChild(text);
        div.style.cursor = "pointer";
        div.addEventListener("click", selectFilter)
        parentDiv.appendChild(div);
    }
}

// Hide and unhide elements
function hideAndUnhide() {
    let iconsShow = document.querySelectorAll('.fa-eye');
    for (let index = 0; index < iconsShow.length; index++) {
        iconsShow[index].addEventListener("click", toggleHide);
        iconsShow[index].style.cursor = "pointer";
    }
}

function toggleHide() {
    //case currently visible -> hide
    if (this.classList[1] == "fa-eye") {
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");

        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display = "none";
    } else if (this.classList[1] == "fa-eye-slash") {
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");

        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display = "block";
    }
}


//-----------------API communication-------------//
function getCountries() {
    fetch(backendDomain+'/countries')
        .then(response => response.json())
        .then(function (json) {
            console.log(json);
            let countries = json;
            console.log(countries);
            genCountriesDropDown(countries);
        })
}

function sendFilters() {
    //get temperatures
    let temperatures = [];
    let temperaturesCheck = getID("temperature-dropdown").querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < temperaturesCheck.length; i++) {
        temperatures.push(temperaturesCheck[i].value)
    }
    filter.temperatures = temperatures;

    //plant type
    let plantType = [];
    let plantTypeCheck = getID("plantType").querySelectorAll('[selected="true"]');
    for (var i = 0; i < plantTypeCheck.length; i++) {
        plantType.push(plantTypeCheck[i].querySelector("p").innerHTML)
    }
    filter.plantType = plantType;

    //Light
    let light = [];
    let lightCheck = getID("light").querySelectorAll('[selected="true"]');
    for (var i = 0; i < lightCheck.length; i++) {
        light.push(lightCheck[i].querySelector("p").innerHTML)
    }
    filter.light = light;

    //soil
    let soil = [];
    let soilCheck = getID("soil").querySelectorAll('[selected="true"]');
    for (var i = 0; i < soilCheck.length; i++) {
        soil.push(soilCheck[i].querySelector("p").innerHTML)
    }
    filter.soil = soil;
    
    //water
    let water = [];
    let waterCheck = getID("water").querySelectorAll('[selected="true"]');
    for (var i = 0; i < waterCheck.length; i++) {
        water.push(waterCheck[i].querySelector("p").innerHTML)
    }
    filter.water = water;

    //soilPH
    let soilPH = [];
    let soilPHCheck = getID("soilPH").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < soilPHCheck.length; i++) {
        soilPH.push(soilPHCheck[i].value)
    }
    filter.soilPH = soilPH;

    //tolerance
    let tolerance = [];
    let toleranceCheck = getID("tolerance").querySelectorAll('input[type="radio"]:checked');
    for (var i = 0; i < toleranceCheck.length; i++) {
        tolerance.push(toleranceCheck[i].id)
    }
    filter.tolerance = tolerance;

    //lifeCycle
    let lifeCycle = [];
    let lifeCycleCheck = getID("lifeCycle").querySelectorAll('input[type="radio"]:checked');
    for (var i = 0; i < lifeCycleCheck.length; i++) {
        lifeCycle.push(lifeCycleCheck[i].id)
    }
    filter.lifeCycle = lifeCycle;

    //outdoor
    let outdoor = [];
    let outdoorCheck = getID("outdoor").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < outdoorCheck.length; i++) {
        outdoor.push(outdoorCheck[i].value)
    }
    filter.outdoor = outdoor;

    //specialized
    let specialized = [];
    let specializedCheck = getID("specialized").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < specializedCheck.length; i++) {
        specialized.push(specializedCheck[i].value)
    }
    filter.specialized = specialized;

    //nativeEnvironment
    let nativeEnvironment = [];
    let nativeEnvironmentCheck = getID("nativeEnvironment").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < nativeEnvironmentCheck.length; i++) {
        nativeEnvironment.push(nativeEnvironmentCheck[i].value)
    }
    filter.nativeEnvironment = nativeEnvironment;

    //humanUse
    let humanUse = [];
    let humanUseCheck = getID("humanUse").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < humanUseCheck.length; i++) {
        humanUse.push(humanUseCheck[i].value)
    }
    filter.humanUse = humanUse;

    //building
    let building = [];
    let buildingCheck = getID("building").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < buildingCheck.length; i++) {
        building.push(buildingCheck[i].value)
    }
    filter.building = building;

    //plant type
    let canopy = [];
    let canopyCheck = getID("canopyShape").querySelectorAll('[selected="true"]');
    for (var i = 0; i < canopyCheck.length; i++) {
        canopy.push(canopyCheck[i].querySelector("p").innerHTML)
    }
    filter.canopy = canopy;

}

//----------other functions--------//
function getID(id) {
    try {
        return document.getElementById(id);
    } catch (error) {
        return error;
    }
}


