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
    let plantType = document.getElementsByClassName("plantTypeImg");
    for (let index = 0; index < plantType.length; index++) {
        addImg(plantType[index], plantTypeMap);

    }


    let canopyShape = document.getElementsByClassName("canopyShapeImg");
    for (let index = 0; index < canopyShape.length; index++) {
        addImg(canopyShape[index], canopyShapeMap);
    }

    let colorFlower = document.getElementsByClassName("colorFlowerImg");
    for (let index = 0; index < colorFlower.length; index++) {
        addImg(colorFlower[index], flowerColorMap);
    }


    let fruitColor = document.getElementsByClassName("fruitColorImg");
    for (let index = 0; index < fruitColor.length; index++) {
        addImg(fruitColor[index], fruitColorMap);
    }

    let flowerScent = document.getElementsByClassName("flowerScentImg");
    for (let index = 0; index < flowerScent.length; index++) {
        if (flowerScent[index].alt == "scentFlowerNoFragrance") {
            flowerScent[index].style.display = "none";
        } else {
            flowerScent[index].src = "https://landscapeplants.aub.edu.lb/images/iconFragant.png";
        }
    }

    let edible = document.getElementsByClassName("edibleImg");
    for (let index = 0; index < edible.length; index++) {
        if (edible[index].alt == "no") {
            edible[index].style.display = "none";
        } else {
            edible[index].src = "https://landscapeplants.aub.edu.lb/images/iconEdible.png";
        }
    }


    let light = document.getElementsByClassName("lightImg");
    for (let index = 0; index < light.length; index++) {
        addImg(light[index], lightMap);
    }

    let water = document.getElementsByClassName("waterImg");
    for (let index = 0; index < water.length; index++) {
        addImg(water[index], waterMap);
    }


    initializeTooltips();
    document.getElementById("zoomed_image").style.display = "none";
    var images = document.getElementsByClassName("item_image");
    for (var i = 0; i < images.length; i++) {
        console.log(i);
        images[i].id="plant_image_"+i;
        // images[i].onmouseout = unzoom;
        // images[i].onmouseover = zoom;
        images[i].onmouseover=function (){
            magnify(this.id);
            console.log("in");
        }
        
        images[i].onmouseleave=function (){
            console.log("out");
            unmagnify();
        };
    }

    let cards = document.getElementsByClassName("section");
    for (let index = 0; index < cards.length; index++) {
        cards[index].addEventListener("click", function () {
            window.location.href="/plant?id="+this.id;
        })
    }
}

function addImg(parentDiv, usedMap) {
    if (parentDiv.src === undefined) {
        parentDiv.style.display = "none"
    }
    parentDiv.src = usedMap.get(parentDiv.alt);
    parentDiv.title = parentDiv.alt;
}

function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function zoom() {
    document.getElementById("zoomed_image").src = this.src;
    document.getElementById("zoomed_image").style.removeProperty("display");
}
function unzoom() {
    // alert("unzoom");
    document.getElementById("zoomed_image").style.display = "none";
}

function magnify(imgID) {
    // alert("hi");
    var zoom=2;
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    glass.setAttribute("id", "magnifier");
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /*set the position of the magnifier glass:*/
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
  function unmagnify(){
      document.getElementById("magnifier").remove();
      console.log("out");
  }