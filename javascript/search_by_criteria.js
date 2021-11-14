//------------------map creation start-----------------//

const domainImages = "https://landscapeplants.aub.edu.lb/images/search/plant/";
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

//-------------------map creation end---------------------//
window.onload = function () {
    getCountries();
    initializeTooltips();
    createPlantType();
    createLight();
    createSoil();
    createWater();
    hideAndUnhide();
}

//----------other functions--------//
function getID(id) {
    try {
        return document.getElementById(id);
    } catch (error) {
        return error;
    }
}

//-------------API calls----------//
function getCountries() {
    fetch('../json/countries.json')
        .then(response => response.json())
        .then(function (json) {
            let countries = json.countries;
            console.log(countries);
            genCountriesDropDown(countries);
        })
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
        this.classList.add("boxWithImageText");
        this.classList.remove("boxWithImageTextSelected")
        if(this == getID("light") || this == getID("soil")|| this == getID("water")){
            div.classList.add("boxWithImageTextSmall");
        }
        this.setAttribute("selected", "false");
    } else {
        this.classList.remove("boxWithImageText")
        this.classList.add("boxWithImageTextSelected");
        if(this == getID("light") || this == getID("soil") || this == getID("water")){
            div.classList.add("boxWithImageTextSmall");
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

//other
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function createFilterBoxes(parentDiv, usedMap){
    for (let [key, value] of usedMap) {
        let div = document.createElement("div");
        div.classList.add("boxWithImageText");
        if(usedMap == lightMap || usedMap == soilMap || usedMap == waterMap){
            div.classList.add("boxWithImageTextSmall");
        }
        let image = document.createElement("img");
        image.src = value;
        let text = document.createElement("p");
        text.innerHTML=key;
        div.appendChild(image);
        div.appendChild(text);
        div.style.cursor = "pointer";
        div.addEventListener("click",selectFilter)
        parentDiv.appendChild(div);
    }
}

// Hide and unhide elements
function hideAndUnhide() {
    let iconsShow = document.querySelectorAll('.fa-eye');
    for (let index = 0; index < iconsShow.length; index++) {
        iconsShow[index].addEventListener("click",toggleHide);
        iconsShow[index].style.cursor="pointer";
    }
}

function toggleHide() {
    //case currently visible -> hide
    if(this.classList[1] == "fa-eye"){
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
        
        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display="none";
    }else if(this.classList[1] == "fa-eye-slash"){
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
        
        let parent = this.parentNode.parentNode;
        parent.querySelector(".content").style.display="block";
    }
}







