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


window.onload = function () {
    let plantType = document.getElementById("plantTypeImg");
    addImg(plantType,plantTypeMap);

    let canopyShape = document.getElementById("canopyShapeImg");
    addImg(canopyShape, canopyShapeMap);

    let colorFlower = document.getElementsByClassName("colorFlowerImg");
    for (let index = 0; index < colorFlower.length; index++) {
        addImg(colorFlower[index], flowerColorMap);
    }
    

    let fruitColor = document.getElementsByClassName("fruitColorImg");
    for (let index = 0; index < fruitColor.length; index++) {
        addImg(fruitColor[index], fruitColorMap);
    }

    let flowerScent = document.getElementById("flowerScentImg");
    if(flowerScent.alt == "scentFlowerNoFragrance"){
        flowerScent.style.display = "none";
    }else{
        flowerScent.src = "https://landscapeplants.aub.edu.lb/images/iconFragant.png";
    }

    let edible = document.getElementById("edibleImg");
    if(edible.alt == "no"){
        edible.style.display = "none";
    }else{
        edible.src = "https://landscapeplants.aub.edu.lb/images/iconEdible.png";
    }

    let light = document.getElementsByClassName("lightImg");
    for (let index = 0; index < light.length; index++) {
        addImg(light[index], lightMap);
    }

    let water = document.getElementById("waterImg");
    addImg(water, waterMap);

    initializeTooltips();
    document.getElementById("zoomed_image").style.display="none";
    var images=document.getElementsByClassName("item_image");
for (var i=0; i<images.length; i++) {
    images[i].onmouseout = unzoom
    images[i].onmouseover = zoom;
}
}

function addImg(parentDiv, usedMap) {
    parentDiv.src = usedMap.get(parentDiv.alt);
    parentDiv.title= parentDiv.alt;
}

function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function zoom(){
    document.getElementById("zoomed_image").src=this.src;
    document.getElementById("zoomed_image").style.removeProperty("display");
}
function unzoom(){
    // alert("unzoom");
    document.getElementById("zoomed_image").style.display="none";
}