const domainImages = "https://landscapeplants.aub.edu.lb/images/search/plant/";
const domainLeafImages = "https://landscapeplants.aub.edu.lb/images/search/leaf/"
const domainShapeImages = "https://landscapeplants.aub.edu.lb/images/search/shape/"
const domainMarginsImages = "https://landscapeplants.aub.edu.lb/images/search/margins/"
const domainColorImages = "https://landscapeplants.aub.edu.lb/images/search/";
const plantTypeMap = new Map();
plantTypeMap.set("Cactus/Succulent", domainImages + "CactusSucculent.png");
plantTypeMap.set("Ground Cover", domainImages + "GroundCover.png");
plantTypeMap.set("Lawn", domainImages + "Lawn-palnt.png");
plantTypeMap.set("Palm", domainImages + "Palm.png");
plantTypeMap.set("Shrub", domainImages + "Shrub.png");
plantTypeMap.set("Tree", domainImages + "Trees.png");
plantTypeMap.set("Vine", domainImages + "Vines.png");

const leafTypeMap = new Map();
leafTypeMap.set("Simple", domainLeafImages + "simple.png");
leafTypeMap.set("Trifoliate", domainLeafImages + "Trifoliate.png");
leafTypeMap.set("Palmately Compound", domainLeafImages + "Palmately.png");

const leafArrangementMap = new Map();
leafArrangementMap.set("Alternate", domainLeafImages + "Alternate.png");
leafArrangementMap.set("Spiral", domainLeafImages + "Spiral.png");
leafArrangementMap.set("Opposite", domainLeafImages + "Opposite.png");

const leafShapeMap = new Map();
leafShapeMap.set("Needle", domainShapeImages + "Needle.png");
leafShapeMap.set("Star", domainShapeImages + "Star.png");
leafShapeMap.set("Ovate", domainShapeImages + "Ovate.png");

const leafMarginsMap = new Map();
leafMarginsMap.set("Entire", domainMarginsImages + "Entire.png");
leafMarginsMap.set("Spiny", domainMarginsImages + "Spiny.png");
leafMarginsMap.set("Parted", domainMarginsImages + "Parted.png");

const leafVenationMap = new Map();
leafVenationMap.set("Brachidodrome", domainLeafImages + "Brachidodrome.png");
leafVenationMap.set("Reticulate", domainLeafImages + "Reticulate.png");
leafVenationMap.set("Parallel", domainLeafImages + "Parallel.png");

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
function filters(plantType, canopyShape, plantHeight, plantSpread, plantColorGrow,
    colorFlower, flowerScent, 
    fruitColor, trunkCrownshaft,
    leafType, leafArrangement) {
    this.plantType = plantType;this.canopyShape = canopyShape;
    this.plantHeight = plantHeight;this.plantSpread = plantSpread;this.leafType = leafType;
    this.plantColorGrow = plantColorGrow; this.leafArrangement = leafArrangement;
    this.colorFlower = colorFlower;this.flowerScent = flowerScent;
    this.fruitColor = fruitColor;this.trunkCrownshaft = trunkCrownshaft; 
    
}

let filter = new filters();

//-------------------map creation end---------------------//
window.onload = function () {
    initializeTooltips();
    createPlantType();
    createCanopyShape();
    createLeafType();
    createLeafArrangement();
    createLeafShape();
    createLeafMargins();
    createLeafVenation();
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



// populate canopy shape
function createCanopyShape() {
    let canopyShape = getID("canopyShape");
    createFilterBoxes(canopyShape, canopyShapeMap);
}

//populate plant type
function createPlantType() {
    let plantType = getID("plantType");
    createFilterBoxes(plantType, plantTypeMap);
}

//populate leaf type
function createLeafType() {
    let leafType = getID("leafType");
    createFilterBoxes(leafType, leafTypeMap);
}

//populate leaf arrangement
function createLeafArrangement() {
    let leafArrangement = getID("leafArrangement");
    createFilterBoxes(leafArrangement, leafArrangementMap);
}

//populate leaf shape
function createLeafShape() {
    let leafShape = getID("leafShape");
    createFilterBoxes(leafShape, leafShapeMap);
}

//populate leaf Margins
function createLeafMargins() {
    let leafMargins = getID("leafMargins");
    createFilterBoxes(leafMargins, leafMarginsMap);
}

//populate leaf Venation
function createLeafVenation() {
    let leafVenation = getID("leafVenation");
    createFilterBoxes(leafVenation, leafVenationMap);
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

function createFilterBoxes(parentDiv, usedMap) {
    for (let [key, value] of usedMap) {
        let div = document.createElement("div");
        if (usedMap == colorChangeMap || usedMap == colorGrowMap) {
            div.classList.add("colorBoxWithImageText");
        } else {
            div.classList.add("boxWithImageText");
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

//create filter box
function selectFilter() {
    if (this.getAttribute("selected") == "true") {
        if (this.parentNode == getID("plantColorGrow") || this.parentNode == getID("plantColorChange")) {
            this.classList.add("colorBoxWithImageText");
            this.classList.remove("colorBoxWithImageTextSelected")
        } else {
            this.classList.add("boxWithImageText");
            this.classList.remove("boxWithImageTextSelected")
        }

        this.setAttribute("selected", "false");
    } else {
        if (this.parentNode == getID("plantColorGrow") || this.parentNode == getID("plantColorChange")) {
            this.classList.add("colorBoxWithImageTextSelected");
            this.classList.remove("colorBoxWithImageText")
        } else {
            this.classList.remove("boxWithImageText")
            this.classList.add("boxWithImageTextSelected");
        }

        this.setAttribute("selected", "true");
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

//other
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function getID(id) {
    return document.getElementById(id);
}

function sendFilters() {

    //plant type
    let plantType = [];
    let plantTypeCheck = getID("plantType").querySelectorAll('[selected="true"]');
    for (var i = 0; i < plantTypeCheck.length; i++) {
        plantType.push(plantTypeCheck[i].querySelector("p").innerHTML)
    }
    filter.plantType = plantType;


    //canopyShape shape
    let canopyShape = [];
    let canopyShapeCheck = getID("canopyShape").querySelectorAll('[selected="true"]');
    for (var i = 0; i < canopyShapeCheck.length; i++) {
        canopyShape.push(canopyShapeCheck[i].querySelector("p").innerHTML)
    }
    filter.canopyShape = canopyShape;

    //plantHeight
    let plantHeight = [];
    let plantHeightCheck = getID("plantHeight").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < plantHeightCheck.length; i++) {
        plantHeight.push(plantHeightCheck[i].value)
    }
    filter.plantHeight = plantHeight;

    //plantSpread
    let plantSpread = [];
    let plantSpreadCheck = getID("plantSpread").querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < plantSpreadCheck.length; i++) {
        plantSpread.push(plantSpreadCheck[i].value)
    }
    filter.plantSpread = plantSpread;

    //plantColorGrow shape
    let plantColorGrow = [];
    let plantColorGrowCheck = getID("plantColorGrow").querySelectorAll('[selected="true"]');
    for (var i = 0; i < plantColorGrowCheck.length; i++) {
        plantColorGrow.push(plantColorGrowCheck[i].querySelector("p").innerHTML)
    }
    filter.plantColorGrow = plantColorGrow;

    //plantFlowerColor shape
    let plantFlowerColor = [];
    let plantFlowerColorCheck = getID("plantFlowerColor").querySelectorAll('[selected="true"]');
    for (var i = 0; i < plantFlowerColorCheck.length; i++) {
        plantFlowerColor.push(plantFlowerColorCheck[i].querySelector("p").innerHTML)
    }
    filter.colorFlower = plantFlowerColor;

    //scentFlower
    let scentFlower = [];
    let scentFlowerCheck = getID("scentFlower").querySelectorAll('input[type="radio"]:checked');
    for (var i = 0; i < scentFlowerCheck.length; i++) {
        scentFlower.push(scentFlowerCheck[i].id)
    }
    filter.flowerScent = scentFlower;

    //fruitColor shape
    let fruitColor = [];
    let fruitColorCheck = getID("fruitColor").querySelectorAll('[selected="true"]');
    for (var i = 0; i < fruitColorCheck.length; i++) {
        fruitColor.push(fruitColorCheck[i].querySelector("p").innerHTML)
    }
    filter.fruitColor = fruitColor;
    

    //trunkCrownshaft
    let trunkCrownshaft = [];
    let trunkCrownshaftCheck = getID("trunkCrownshaft").querySelectorAll('input[type="radio"]:checked');
    for (var i = 0; i < trunkCrownshaftCheck.length; i++) {
        trunkCrownshaft.push(trunkCrownshaftCheck[i].id)
    }
    filter.trunkCrownshaft = trunkCrownshaft;

    //leafType shape
    let leafType = [];
    let leafTypeCheck = getID("leafType").querySelectorAll('[selected="true"]');
    for (var i = 0; i < leafTypeCheck.length; i++) {
        leafType.push(leafTypeCheck[i].querySelector("p").innerHTML)
    }
    filter.leafType = leafType;

    //leafArrangement shape
    let leafArrangement = [];
    let leafArrangementCheck = getID("leafArrangement").querySelectorAll('[selected="true"]');
    for (var i = 0; i < leafArrangementCheck.length; i++) {
        leafArrangement.push(leafArrangementCheck[i].querySelector("p").innerHTML)
    }
    filter.leafArrangement = leafArrangement;

    let form = document.createElement("form");
    form.style.display="hidden";
    form.id = "hiddenForm";
    form.action = "/plantIdentification";
    form.method = "POST";
    let input = document.createElement("textarea");
    input.id = "hiddentInput";
    input.type="text";
    input.name = "sentFilters";
    input.value = JSON.stringify(filter);
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

}