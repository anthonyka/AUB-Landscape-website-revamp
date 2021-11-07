window.onload = function () {
    getCountries();

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

function genTemperatureDD(country){
    let temp = country.temperatures;
    let tempDD = getID("temperatureSelect");
    for (let index = 0; index < temp.length; index++) {
        let item = createDDItemTemp(temp[index]);
        tempDD.appendChild(item);
    }
    tempDD.style.display="block";
}

function createDDItemTemp(text) {
    let option = document.createElement("option");
    option.id = "temperatureDD-" + text;;
    option.innerHTML = text;
    option.value = text;
    option.style.backgroundColor = temperatureColor(text);
    return option;
}

function showImage(country) {
    let countryMap = getID("country-map");
    let countryMapImg = countryMap.querySelector("img");
    // countryMap.style.display = "block";
    countryMapImg.setAttribute('src', 'https://landscapeplants.aub.edu.lb/Images/CountryClimateMaps/' + country.text + '.png');
    countryMapImg.setAttribute('alt', 'Temperature Map of ' + country.text);
}

function temperatureColor(temp) {
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




