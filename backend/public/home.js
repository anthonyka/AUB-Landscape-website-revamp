window.onload=function(){
    fetch("/allplants?type=all")
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (json) {
        allplants = json;
        console.log(allplants);

        var i=Math.floor(Math.random() * allplants.length);
        console.log(allplants[i]);
        document.getElementById("main_spot").appendChild(createelement(allplants[i]));
    });
    
}

function createelement(json){
    console.log(json);
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
    var ref=document.createElement("a");
    ref.setAttribute("href","/plant?id="+json._id);
    ref.setAttribute("class","ref");
    ref.innerHTML="more";
    mycontainer.appendChild(spot);
    mycontainer.appendChild(myimage);
    mycontainer.appendChild(Scientificname);
    mycontainer.appendChild(name);
    mycontainer.appendChild(ref);
    return mycontainer;
}