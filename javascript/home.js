window.onload=function(){
    fetch("../json/plants.json")
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (json) {
        allplants = JSON.parse(json);
        console.log(allplants);

        var i=Math.floor(Math.random() * allplants.length);
        console.log(allplants[i]);
        document.getElementById("main_spot").appendChild(createelement(allplants[i]));
    });
    
}



function createelement(json){
    var spot=document.createElement("p");
    spot.setAttribute("id","spot");
    spot.innerHTML="Spotlight";
    var key=json.Images[0].Key;
    var mycontainer=document.createElement("div");
    mycontainer.object=json;
    mycontainer.imageIdex=0;
    mycontainer.setAttribute("class","polaroid");
    myimage=document.createElement("div");
    myimage.style.backgroundImage="url(https://landscapeplants.aub.edu.lb"+key+")";
    myimage.setAttribute("class", "item_image");
    var name=document.createElement("p");
    var Scientificname=document.createElement("p");
    Scientificname.innerHTML=json.ScientificName;
    Scientificname.setAttribute("class", "Scientificname");
    name.innerHTML=json.CommonEnglishName;
    name.setAttribute("class", "englishname");
    mycontainer.appendChild(spot);
    mycontainer.appendChild(myimage);
    mycontainer.appendChild(Scientificname);
    mycontainer.appendChild(name);
    return mycontainer;
}